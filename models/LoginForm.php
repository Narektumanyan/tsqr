<?php
namespace app\models;

use dektrium\user\models\LoginForm as BaseLoginForm;
use yii\base\Model;
use dektrium\user\helpers\Password;

class LoginForm extends BaseLoginForm {

    public $email;

    public function attributeLabels()
    {
        return [
        
            'email'      => \Yii::t('user', 'Email'),
            'password'   => \Yii::t('user', 'Password'),
            'rememberMe' => \Yii::t('user', 'Remember me'),
        ];
    }
    
    public function rules()
    {
        return [
            ['email', 'required', 'message'=>"Email cannot be blank"],
            ['password', 'required', 'message'=>"Password cannot be blank"],
            ['email', 'trim'],
            ['password', function ($attribute) {
                if ($this->user === null || !Password::validate($this->password, $this->user->password_hash)) {
                    $this->addError($attribute, \Yii::t('user', 'Invalid email or password'));
                }
            }],
            ['email', function ($attribute) {
                if ($this->user !== null) {
                    $confirmationRequired = $this->module->enableConfirmation && !$this->module->enableUnconfirmedLogin;
                    if ($confirmationRequired && !$this->user->getIsConfirmed()) {
                        $this->addError($attribute, \Yii::t('user', 'You need to confirm your email address'));
                    }
                    if ($this->user->getIsBlocked()) {
                        $this->addError($attribute, \Yii::t('user', 'Your account has been blocked'));
                    }
                }
            }],
            ['rememberMe', 'boolean'],
        ];
    }
    
    public function beforeValidate()
    {
        if (Model::beforeValidate()) {   
            $this->user = $this->finder->findUserByEmail($this->email);
            return true;
        } else {
            return false;
        }
    }

}