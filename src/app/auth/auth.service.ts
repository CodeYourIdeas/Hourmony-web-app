
import { CognitoUserPool , CognitoUserAttribute , CognitoUser,
  AuthenticationDetails,
  CognitoUserSession
} from 'amazon-cognito-identity-js';

const POOL_DATA = {
  UserPoolId: 'us-east-1_XsJaumdSj',
  ClientId: '5ann99p8cm8iq6mnhkf1orsdho',
};

// USER_POOL_CLIENT_SECRET
const userPool = new CognitoUserPool(POOL_DATA);

import {User} from './user.modle';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
  authIsLoading = new BehaviorSubject<boolean>(false);
  authStatusChanged = new Subject<boolean>();

  signUp(user: User) {
    console.log(user);
    const attrList: CognitoUserAttribute[] = [];
    const emailAttribute = {
      Name: 'email',
      Value: user.email
    };
    const givenName = {
      Name: 'given_name',
      Value: user.firstName
    };
    const phoneNumber = {
      Name: 'phone_number',
      Value: user.phoneNumber + ''
    };
    attrList.push(new CognitoUserAttribute(emailAttribute));
    attrList.push(new CognitoUserAttribute(givenName));
    attrList.push(new CognitoUserAttribute(phoneNumber));
    userPool.signUp(user.userName, user.secretKey2, attrList, null , (err, result) => {
      if (err) {
        console.log(err);
        alert(err);
        return;
      }
      console.log('success');
      alert('you have successfully created the account please verify your account');
      // this.registeredUser = result.user;
    });
    return;
  }

  constructor(private router: Router) {}
  confirmUser(userName: string, code: string) {
    const userData = {
      Username: userName,
      Pool: userPool
    };
    const cognitUser = new CognitoUser(userData);
    cognitUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        console.log(err);
        alert(err);
        return;
      }
      alert('your account is confirmed successfully');
      console.log('sucess');
    });
  }

  signIn(sk1: string, sk2: string) {
    this.authIsLoading.next(true);
    console.log(sk1, sk2);
    const authData = {
      Username: sk1,
      Password: sk2
    };
    const authDetails = new AuthenticationDetails(authData);
    const  userData = {
      Username: sk1,
      Pool : userPool
    };
    const that = this;
    const  cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authDetails, {
      onSuccess(result: CognitoUserSession) {
        that.authStatusChanged.next(true);
        console.log(result);
        console.log('sucess');
        that.router.navigate(['/jobSeeker']);
        that.authIsLoading.next(false);
      },
      onFailure(err) {
        console.log(err);
        alert(err);
      }
    });
    // this.authStatusChanged.next(true);
    return;
  }

  getAuthenticatedUser() {
    return userPool.getCurrentUser();
  }

  logout() {
    this.getAuthenticatedUser().signOut();
    this.authStatusChanged.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    const user = this.getAuthenticatedUser();
    console.log('userId' + user);
    const obs = Observable.create((observer) => {
      if (!user) {
        observer.next(false);
      } else {
        user.getSession((err, session) => {
          if (err) {
            observer.next(false);
          } else {
            if (session.isValid()) {
              observer.next(true);
            } else {
              observer.next(false);
            }
          }
        });
      }
      observer.complete();
    });
    return obs;
  }
  initAuth() {
    this.isAuthenticated().subscribe(
      (auth) => this.authStatusChanged.next(auth)
    );
  }
}
