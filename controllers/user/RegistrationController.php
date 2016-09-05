<?php
/**
 * Created by PhpStorm.
 * User: Andrey
 * Date: 01.04.2015
 * Time: 18:10
 */
namespace app\controllers\user;

use dektrium\user\models\RegistrationForm;
use dektrium\user\models\ResendForm;

class RegistrationController extends \dektrium\user\controllers\RegistrationController
{
	protected $session;

	public function actionRegister()
	{
		if (!$this->module->enableRegistration) {
			throw new NotFoundHttpException;
		}

		$model = \Yii::createObject(RegistrationForm::className());

		$this->performAjaxValidation($model);

		if ($model->load(\Yii::$app->request->post()) && $model->register()) {
			$registerForm = \Yii::$app->request->post("register-form");
			return $this->render('resend', [
				'title'  => \Yii::t('user', 'Account confirmation'),
				'module' => $this->module,
				'email' => isset($registerForm["email"])? $registerForm["email"] : ""
			]);
		}

		return $this->render('register', [
			'model'  => $model,
			'module' => $this->module,
		]);
	}

	public function actionResend()
	{
		if ($this->module->enableConfirmation == false) {
			throw new NotFoundHttpException;
		}

		$model = \Yii::createObject(ResendForm::className());

		$this->performAjaxValidation($model);

		$email = \Yii::$app->request->post("email");
		if(isset($email)){
			$form["register-form"] = array('email' => $email);
			if ($model->load($form, "register-form") && $model->resend()) {
                return $this->render('resend', [
                    'title'  => \Yii::t('user', 'A new confirmation link has been sent'),
                    'module' => $this->module,
                    'email' => $email,
                ]);
//				return $this->render('/message', [
//					'title'  => \Yii::t('user', 'A new confirmation link has been sent'),
//					'module' => $this->module,
//				]);
			}
		}

		return $this->render('resend', [
			'model' => $model
		]);
	}

    /**
     * Confirms user's account. If confirmation was successful logs the user and shows success message. Otherwise
     * shows error message.
     * @param  integer $id
     * @param  string  $code
     * @return string
     * @throws \yii\web\HttpException
     */
    public function actionConfirm($id, $code)
    {
        $user = $this->finder->findUserById($id);

        if ($user === null || $this->module->enableConfirmation == false) {
            throw new NotFoundHttpException;
        }

        $resConfirm = $user->attemptConfirmation($code);

        $email = \Yii::$app->request->post("email");
        return $this->render('message', [
            'title'  => \Yii::t('user', 'Account confirmation'),
            'module' => $this->module,
            'email' => $email,
            'confirmed' => $resConfirm,
        ]);
    }
}