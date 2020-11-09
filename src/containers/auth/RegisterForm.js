import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeField, initializeForm, register} from '../../modules/auth';
import AuthFrom from '../../components/auth/AuthForm';
import {check} from  '../../modules/user';

import {withRouter} from 'react-router-dom';


const RegisterForm = ({history}) =>{
    const [error, setError] =useState(null);
    const dispatch = useDispatch();
    const {form, auth, authError, user} = useSelector(({auth, user}) =>({
            form: auth.register,
            auth: auth.auth,
            authError: auth.authError,
            user: user.user
    }));

    
    const onChange = e =>{
        const {value, name} = e.target;

        dispatch(
            changeField({
                form:"register",
                key: name,
                value
            })
        );


    };

    //폼 이벤트 등록 핸들러
    const onSubmit = e => {
        e.preventDefault();
        const {username, password, passwordConfirm} = form;
        //하나라도 비어있다면
        if([username, password, passwordConfirm].includes('')){
            setError('빈 칸을 모두 입력하세요 ');
            return;
        }

        //비밀번호가 일치하지 않다면
        if(password !== passwordConfirm)
        {
            setError('비밀번호가 일치하지 않습니다.');
            dispatch(changeField({form:'register', key:'password', value:''}));
            dispatch(changeField({form:'register', key:'passwordConfirm', value:''}));
            return;
        }
        dispatch(register({username, password}));
    };

    useEffect(()=>{
        dispatch(initializeForm('register'));
    },[dispatch]);

    //회원가입 성공/실패
    useEffect(()=>{
        if(authError){
           if(authError.response.status === 409){
               setError('이미 존재하는 계정명 입니다.')
               return;
           }

           setError('회원가입 실패');
           return;
           
        }
        if(auth){
            console.log('회원가입 성공');
            console.log(auth);
            dispatch(check());
        }
    }
    ,[auth,authError, dispatch]);

    useEffect(()=>{
        if(user){
            history.push('/')
            try{
                localStorage.setItem('user', JSON.stringify(user));
            }
            catch(e){
                console.log('localStorage is not working');

            }
            // console.log('check API성공');
            // console.log(user);
        }
    },[history, user]);

    return(
        <AuthFrom
            type="register"
            form={form}
            onChange={onChange}
            onSubmit={onSubmit}
            error ={error}
        >

        </AuthFrom>
    );



};

export default withRouter(RegisterForm);