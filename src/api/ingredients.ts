const getGredients = async () => {
    return new Promise((resolve, reject)=>{
        fetch('/ingredients.json').then((res) => {
          return res.json();
        }).then(data=>{
          resolve(data);
        }).catch((err)=>{
          reject(err);
        })
    })
}

export {getGredients};
