export namespace Netlib{
    export async function fetch<T>(URL:string): Promise<T | null>{
        try{
           const res:any = await globalThis.fetch(URL);
           if(!res.ok){
                console.error(`Failed to get to ${URL} \n HTTP statues:${res.status}`);
           }
           const data = await res.json();
           console.log(data);
           return data;
        }catch(error:any){
            if (error instanceof Error) {
                console.error('Error fetching data:', error.message);
            } else {
                console.error('An unknown error occurred:', error);
            }
            return null;
        }
        
    }
}