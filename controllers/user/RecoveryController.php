<?php
/**
 * Created by PhpStorm.
 * User: klest
 * Date: 08.07.2015
 * Time: 17:13
 */

namespace app\controllers\user;

use dektrium\user\Finder;
use app\models\RecoveryForm;
use dektrium\user\models\Token;
use yii\web\NotFoundHttpException;
use dektrium\user\traits\AjaxValidationTrait;

class RecoveryController extends \dektrium\user\controllers\RecoveryController {

    use AjaxValidationTrait;

    /** @var Finder */
    protected $finder;

    /**
     * Shows page where user can request password recovery.
     * @return string
     * @throws \yii\web\NotFoundHttpException
     */
    public function actionRequest()
    {
        if (!$this->module->enablePasswordRecovery) {
            throw new NotFoundHttpException;
        }

        $model = \Yii::createObject([
            'class'    => RecoveryForm::className(),
            'scenario' => 'request',
        ]);

        $this->performAjaxValidation($model);

        $model->email = \Yii::$app->request->post("email");

        if ($model->load(\Yii::$app->request->post())
            && !(isset($repeat) && trim($repeat) == "repeat")
            && $model->sendRecoveryMessage()) {
            // todo: сделать вьюху "все хорошо, идите на почту"
            return $this->render('resend', [
                'title'  => \Yii::t('user', 'Recovery message sent'),
                'module' => $this->module,
                'model' => $model,
            ]);
        }

        return $this->render('request', [
            'model' => $model,
        ]);
    }

    /**
     * Displays page where user can reset password.
     * @param  integer $id
     * @param  string  $code
     * @return string
     * @throws \yii\web\NotFoundHttpException
     */
    public function actionReset($id, $code)
    {
        if (!$this->module->enablePasswordRecovery) {
            throw new NotFoundHttpException;
        }

        /** @var Token $token */
        $token = $this->finder->findToken(['user_id' => $id, 'code' => $code, 'type' => Token::TYPE_RECOVERY])->one();

        if ($token === null || $token->isExpired || $token->user === null) {
            \Yii::$app->session->setFlash('danger', \Yii::t('user', 'Recovery link is invalid or expired. Please try requesting a new one.'));
            return $this->render('/message', [
                'title'  => \Yii::t('user', 'Invalid or expired link'),
                'module' => $this->module,
            ]);
        }

        $model = \Yii::createObject([
            'class'    => RecoveryForm::className(),
            'scenario' => 'reset',
        ]);

        $this->performAjaxValidation($model);

        if ($model->load(\Yii::$app->getRequest()->post()) && $model->resetPassword($token)) {
            return $this->render('message', [
                'title'  => \Yii::t('user', 'Password has been changed'),
                'module' => $this->module,
                'model' => $model,
            ]);
        }

        return $this->render('reset', [
            'model' => $model,
        ]);
    }

}