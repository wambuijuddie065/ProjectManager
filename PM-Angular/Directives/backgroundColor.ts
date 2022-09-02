
import { Directive, HostBinding, Input, OnInit } from "@angular/core";


@Directive({
    selector:'[aapBackgroundColor]'
}) 
export class backgroundColor implements OnInit{

    @Input() backgroundColor!:string
    @HostBinding('style.backgrounColor') bgColor!:string

    constructor(){}
    ngOnInit(): void {

        this.bgColor=this.backgroundColor
        
        
    }
}