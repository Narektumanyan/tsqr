<?php
namespace app\models;

use dektrium\user\models\RegistrationForm as BaseRegistrationForm;

class RegistrationForm extends BaseRegistrationForm {
    public $firstName, $lastName, $repeatpassword;

    public function rules()
    {
        return [
            ['firstName', 'filter', 'filter' => 'trim'],
            ['lastName', 'filter', 'filter' => 'trim'],
            ['firstName', 'match', 'pattern' => '/^[-a-zA-Z0-9_\.@]+$/', 'message' => 'First Name is invalid'],
            ['lastName', 'match', 'pattern' => '/^[-a-zA-Z0-9_\.@]+$/', 'message' => 'Last Name is invalid'],
            ['firstName', 'required', 'message'=>"First Name cannot be blank"],
            ['lastName', 'required', 'message'=>"Last Name cannot be blank"],
            ['firstName', 'string', 'min' => 3, 'max' => 20],
            ['lastName', 'string', 'min' => 3, 'max' => 20],
            ['email', 'filter', 'filter' => 'trim'],
            ['email', 'required', 'message'=>"Email cannot be blank"],
            ['email', 'email', 'message' => 'Email is not a valid email address'],
            ['email', 'unique', 'targetClass' => $this->module->modelMap['User'],
                'message' => \Yii::t('user', 'This email address is already associated with another Trendsquare account')],

            ['password', 'required', 'skipOnEmpty' => $this->module->enableGeneratingPassword, 'message'=>"Password cannot be blank"],
            ['password', 'string', 'min' => 6],
            ['repeatpassword', 'compare', 'compareAttribute'=>'password', 'message'=>"Passwords don't match"],
            ['repeatpassword', 'required', 'message'=>"Repeat your password"],
        ];
    }    
    
    public function register()
    {
            
        if (!$this->validate()) {
            return false;
        }
        
        $this->user->setAttributes([
            'email'    => $this->email,
            'firstname' => $this->firstName,
            'lastname' => $this->lastName,
            'password' => $this->password
        ]);
        
        return $this->user->register();
    }
    
    public function attributeLabels()
    {
        return [
            'firstname'=> \Yii::t('user', 'Firstname'),
            'lastname'=> \Yii::t('user', 'Lastname'),
            'email'    => \Yii::t('user', 'Email'),
            'username' => \Yii::t('user', 'Username'),
            'password' => \Yii::t('user', 'Password'),
        ];
    }
} 
