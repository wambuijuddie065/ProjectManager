
import { Directive, HostBinding, Input, OnInit } from "@angular/core";


@Directive({
    selector:'[appBackgroundColor]'
}) 
export class backgroundColor implements OnInit{

    @Input() backgroundColor:string='white'
    @HostBinding('style.backgroundColor') bgColor!:string

    constructor(){}
    ngOnInit() {

        this.bgColor=this.backgroundColor
        
        
    }
}