const userSignin = async (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD08VI2f_GlGf73Zc2qrNB6sbtRRhnGfyA';
      fetch(url,{
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
           email,
           password,
           returnSecureToken: true
        })
      }).then((res)=>{
        return res.json();
      }).then((resData)=>{
        if(resData.error){
          reject(`${resData.error.message} CODE: ${resData.error.code}`);
        }
        else{
          resolve(resData);
        }
      }).catch( err=>{
        reject(err);
      })

    })
}

const userSignup = async (email: string, password: string, repeatPassword: string) => {
     return new Promise((resolve, reject) => {
      const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD08VI2f_GlGf73Zc2qrNB6sbtRRhnGfyA';
      fetch(url,{
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
           email,
           password,
           returnSecureToken: true
        })
      }).then((res)=>{
        return res.json();
      }).then((resData)=>{
        if(resData.error){
          reject(`${resData.error.message} CODE: ${resData.error.code}`);
        }
        else{
          resolve(resData);
        }
      }).catch( err=>{
        reject(err);
      })

    })
}

export {userSignin, userSignup}
