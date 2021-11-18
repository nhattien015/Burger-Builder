export default class API{
    static get(url: string) : Promise<any>{
        
            return new Promise<any>((resolve, reject)=>{
              fetch(url,{
                headers: {
                  "Accept": "application/json",
                  "Content-type": "application/json"
                },
              }).then((res) => {
                  return res.json();
              }).then(data=>{ 
                resolve(data);
              }).catch(err=>{
                reject(err);
              })
            })
        
    }

    static post(url: string, body: object): Promise<any>{
      return new Promise<any>((resolve, reject) => {
        fetch(url,{
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }).then(res=>{
          return res.json();
        }).catch((err)=>{
          console.log(err);
          reject(err);
        }).then((dataRes)=>{
          resolve(dataRes);
        })
      })
    }
}
