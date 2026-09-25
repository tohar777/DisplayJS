export interface Standard {
    init(): void;
    create(): void;
}

export class DEvent {
    static readonly onComplete = "DOMContentLoaded";
    static readonly onLoad = "load";
    static readonly onAbort = "abort";
    static readonly onClick = "click";
}

export namespace Components {
    interface ComponentInterface {
        element?: HTMLElement | HTMLInputElement | HTMLDivElement | HTMLImageElement;
        _text : string;
        id: string;
        width: number;
        height: number;
        addEventListener(event: string,callback: EventListener): void;
        add(parent?: string): void;
    }

    export class Button implements ComponentInterface {
        element: HTMLElement;
        _text : string = "";
        id: string = "";
        width: number = 0;
        height: number = 0;

        constructor(text: string, id: string) {
            this._text = text;
            this.id = id;

            this.element = document.createElement("button");
            this.text = text;
            this.element.id = id;
        }  
        get text(): string {
            return this._text;
        }

        set text(value: string) {
            this._text = value;
            this.element.textContent = value;
        }

        addEventListener(event: string,callback: EventListener): void {
            this.element.addEventListener(event, callback);
        }

        add(parent?: string): void {
            if (parent == null) {
                document.body.appendChild(this.element);
            } else {
                document.getElementById(parent)?.appendChild(this.element);
            }
        }
    }
    export class Image implements ComponentInterface {
        element: HTMLImageElement;
        _text : string = "";
        id: string = "";
        width: number = 0;
        height: number = 0;

        constructor(source: string, id: string) {
            this.id = id;

            this.element = document.createElement("img");
            this.element.src = source;
            this.element.id = id;
        }  
        set source(value: string) {
            this._text = value;
            this.element.textContent = value;
        }

        addEventListener(event: string,callback: EventListener): void {
            this.element.addEventListener(event, callback);
        }

        add(parent?: string): void {
            if (parent == null) {
                document.body.appendChild(this.element);
            } else {
                document.getElementById(parent)?.appendChild(this.element);
            }
        }
    }
    export class List implements ComponentInterface {
        _text = "";

        id = "";
        width = 0;
        height = 0;

        div!: any;

        constructor(data: any, id: string) {
            this.init(data, id);
        }

        private init(data: Array<any>, id: string): void {
            insertTag("div","list","list");
            insertTag("center","center","","list");
            for(let i:number = 0; i < data.length; i++){
                let btn:Components.Button = new Components.Button(data[i].label,data[i].id);
                btn.addEventListener(DEvent.onClick,data[i].action);
                btn.add("center");
                insertTag("br","","","center")
            }
        }

        add(parent?: string): void {
            if (parent == null) {
                document.body.appendChild(this.div.element);
            } else {
                document.getElementById(parent)?.appendChild(this.div.element);
            }
        }

        addEventListener(type: string,listener: EventListenerOrEventListenerObject): void {
            this.div.addEventListener(type, listener);
            }
    }
    export class TextField implements ComponentInterface {
        element: HTMLElement;
        _text = "";

        id = "";
        width = 0;
        height = 0;

        constructor(text: string, id: string, type: string) {
            this.id = id;

            switch (type) {
                case "h1":
                    this.element = document.createElement("h1");
                    break;

                case "h2":
                    this.element = document.createElement("h2");
                    break;

                case "p":
                    this.element = document.createElement("p");
                    break;

                case "span":
                    this.element = document.createElement("span");
                    break;

                default:
                    throw new Error(`Unknown TextField type: ${type}`);
            }
            this.element.id = id;
            this.text = text;
        }

        get text(): string {
            return this._text;
        }

        set text(value: string) {
            this._text = value;
            this.element.innerText = value;
        }

        addEventListener(event: string, callback: EventListener): void {
            this.element.addEventListener(event, callback);
        }

        add(parent?: string): void {
            if (parent == null) {
                document.body.appendChild(this.element);
            } else {
                document.getElementById(parent)?.appendChild(this.element);
            }
        }
    }
    export class Division implements ComponentInterface {
        element: HTMLDivElement;
        _text = "";
        id = "";
        width = 0;
        height = 0;

        constructor(id: string) {
            this.id = id;
            this.element = document.createElement("div");
            this.element.id = id;
        }
        addEventListener(event: string, callback: EventListener): void {
            this.element.addEventListener(event, callback);
        }

        add(parent?: string): void {
            if (parent == null) {
                document.body.appendChild(this.element);
            } else {
                document.getElementById(parent)?.appendChild(this.element);
            }
        }
    }
    export class Input implements ComponentInterface {
        element: HTMLInputElement;
        _text = "";

        id = "";
        width = 0;
        height = 0;

        constructor(text: string, id: string, type: string) {
            this.id = id;
            this.element = document.createElement("input");
            this.element.type = type; 
            this.element.id = id;
            this.text = text;
        }

        get text(): string {
            return this._text;
        }

        set text(value: string) {
            this._text = value;
            this.element.placeholder = value;
        }
        get value():string{
            return this.element.value;
        }
        addEventListener(event: string, callback: EventListener): void {
            this.element.addEventListener(event, callback);
        }

        add(parent?: string): void {
            if (parent == null) {
                document.body.appendChild(this.element);
            } else {
                document.getElementById(parent)?.appendChild(this.element);
            }
        }
    }
    export function insertTag(type:string,id?:string,classid?:string,parent?:string){
        let element:HTMLElement | HTMLInputElement = document.createElement(type);
        if (id == null) {
            //skip
        } else {
            element.id = id;
        }
        if (classid == null) {
            //skip
        } else {
            element.className = classid;
        }
        if (parent == null) {
            document.body.appendChild(element);
        } else {
            document.getElementById(parent)?.appendChild(element);
        }
    }
}

export class DisplayJS {
    static start(main: Standard): void {
        addEventListener(DEvent.onLoad, () => {
            main.init();
        });

        addEventListener(DEvent.onComplete, () => {
            main.create();
        });
    }
}