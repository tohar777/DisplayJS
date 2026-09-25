import { DisplayJS, DEvent,Components,Standard } from "./lib/display";
import { Netlib } from "./lib/displayNetlib";
class Main implements Standard{
    count:number = 0;
    init(){

    }
    sendMessage(msg:string):void{
        let msgTF:Components.TextField = new Components.TextField(msg,"","h1");
        msgTF.add("container");
        Components.insertTag("br");
    }
    async create(){
        let city:string = "";
        let txt:Components.TextField = new Components.TextField("","cityName","h2")
        let data:Array<any> = [
            {label:"Haifa",id:"test",action:()=>{ city = "Haifa"; txt.text = city;}},
            {label:"Tel Aviv",id:"test",action:()=>{ city = "Tel Aviv"; txt.text = city; }},
            {label:"Eilat",id:"test",action:()=>{ city = "Eilat"; txt.text = city; }},
        ]
        let list:Components.List = new Components.List(data,"myList");
        txt.add();
        list.add();
    }
}
DisplayJS.start(new Main());