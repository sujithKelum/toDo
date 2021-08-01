/*
 * @Author: Nisal Madusanka(EruliaF) 
 * @Date: 2020-04-15 17:54:23 
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2020-04-15 19:10:35
 */


interface KeyCount {
    [key: string]: number
}

export class GenerateResponse{

    private errorBody:{ property: string, message: string }[]=[];
    private inputKeyArray:Array<string>=[];
    private keyCount:KeyCount={};

    constructor(
        private readonly errorList: Array<any>
    ){        
    }

    run(){
        this.errorList.map((errorItem,index)=>{

            this.inputKeyArray=[];
            
            this.inputKeyArray.push(errorItem["property"]);

            this.keyCount[this.inputKeyArray.join('.')]=errorItem["children"].length;

            if(errorItem["constraints"]){
                this.errorBody.push({
                    property:this.inputKeyArray.join('.'),
                    message:errorItem["constraints"][Object.keys(errorItem["constraints"])[0]]
                });
            }
            if(errorItem["children"].length===0){
                this.inputKeyArray.pop();
            }else{
              return this.getChildren(errorItem["children"])
            }

            
        })        
        return this.errorBody;
    }

    getChildren(childrenList:Array<any>){
        childrenList.map((errorItem,index)=>{           

            this.inputKeyArray.push(errorItem["property"]);

            //console.log(this.inputKeyArray.join('.'));

            this.keyCount[this.inputKeyArray.join('.')]=errorItem["children"].length;

            if(errorItem["constraints"]){
                this.errorBody.push({
                    property:this.inputKeyArray.join('.'),
                    message:errorItem["constraints"][Object.keys(errorItem["constraints"])[0]]
                });
            }
            if(errorItem["children"].length===0){
                this.inputKeyArray.pop();
            }else{
              return this.getChildren(errorItem["children"])
            }

            

            if(this.keyCount[this.inputKeyArray.join('.')]<=1){
                this.inputKeyArray.pop();
            }

            
            this.removeKeys();
            //console.log(this.inputKeyArray.join('.'),this.keyCount);
            this.keyCount[this.inputKeyArray.join('.')]=this.keyCount[this.inputKeyArray.join('.')]-1;
        });
        
    }


       removeKeys():void{
          
            do {               
                if(this.keyCount[this.inputKeyArray.join('.')]<=1){
                    this.inputKeyArray.pop();
                }
                //console.log(this.keyCount[this.inputKeyArray.join('.')]);
            }
            while (this.keyCount[this.inputKeyArray.join('.')]<2);  
            
        }
}


