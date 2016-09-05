<?php
namespace app\models;

use dektrium\user\models\User as BaseUser;
use dektrium\user\models\Token;
use dektrium\user\Finder;
use yii\log\Logger;

/**
 * User ActiveRecord model.
 *
 * Add database fields:
 * @property string $firstname
 * @property string $lastname
*/

class User extends BaseUser
{
    public function scenarios()
    {
        return [
            'register' => ['firstname', 'lastname', 'email', 'password'],
            'connect'  => ['username', 'email'],
            'create'   => ['username', 'email', 'password'],
            'update'   => ['username', 'email', 'password'],
            'settings' => ['username', 'email', 'password']
        ];
    }

    /**
     * This method attempts user confirmation. It uses finder to find token with given code and if it is expired
     * or does not exist, this method will throw exception.
     *
     * If confirmation passes it will return true, otherwise it will return false.
     *
     * @param  string  $code Confirmation code.
     */
    public function attemptConfirmation($code)
    {
        /** @var Token $token */
        $token = $this->finder->findToken([
            'user_id' => $this->id,
            'code'    => $code,
            'type'    => Token::TYPE_CONFIRMATION,
        ])->one();

        if ($token === null || $token->isExpired) {
            \Yii::$app->session->setFlash('danger', \Yii::t('user', 'The confirmation link is invalid or expired. Please try requesting a new one.'));

            return false;
        } else {
            $token->delete();

            $this->confirmed_at = time();

            \Yii::$app->user->login($this);

            \Yii::getLogger()->log('User has been confirmed', Logger::LEVEL_INFO);

            if ($this->save(false)) {
                \Yii::$app->session->setFlash('success', \Yii::t('user', 'Thank you, registration is now complete.'));
            } else {
                \Yii::$app->session->setFlash('danger', \Yii::t('user', 'Something went wrong and your account has not been confirmed.'));
            }

            return true;
        }
    }
}