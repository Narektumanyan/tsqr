<?php
namespace app\models;

use \dektrium\user\models\RecoveryForm as BaseRecoveryForm;
use \dektrium\user\models\Token;

class RecoveryForm extends BaseRecoveryForm {
    public $repeatpassword;

    public function rules()
    {
        return [
            'emailTrim' => ['email', 'filter', 'filter' => 'trim'],
            'emailRequired' => ['email', 'required', 'message'=>"Email cannot be blank"],
            'emailPattern' => ['email', 'email'],
            'emailExist' => ['email', 'exist',
                'targetClass' => $this->module->modelMap['User'],
                'message' => \Yii::t('user', 'There is no user with this email address')
            ],
            'emailUnconfirmed' => ['email', function ($attribute) {
                $this->user = $this->finder->findUserByEmail($this->email);
                if ($this->user !== null && $this->module->enableConfirmation && !$this->user->getIsConfirmed()) {
                    $this->addError($attribute, \Yii::t('user', 'You need to confirm your email address'));
                }
            }],
            ['password', 'required', 'skipOnEmpty' => $this->module->enableGeneratingPassword, 'message'=>"Password cannot be blank"],
            ['password', 'string', 'min' => 6],
            ['repeatpassword', 'compare', 'compareAttribute'=>'password', 'message'=>"Passwords don't match"],
            ['repeatpassword', 'required', 'message'=>"Repeat your password"],
        ];
    }

    /** @inheritdoc */
    public function scenarios()
    {
        return [
            'request' => ['email'],
            'reset'   => ['password', 'repeatpassword']
        ];
    }

    /**
     * Resets user's password.
     *
     * @param  Token $token
     * @return bool
     */
    public function resetPassword(Token $token)
    {
        if (!$this->validate() || $token->user === null) {
            return false;
        }

//        $this->user->setAttributes([
//            'password' => $this->password,
//        ]);

        return $token->user->resetPassword($this->password);
    }

    public function attributeLabels()
    {
        return [
            'password' => \Yii::t('user', 'Password'),
        ];
    }
}
