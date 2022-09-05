
import { Directive, HostBinding, Input, OnInit } from "@angular/core";


@Directive({
    selector:'[errorColor]'
}) 
export class errorColor implements OnInit{

    @Input() Color:string='black'
    @HostBinding('style.Color') textColor!:string

    constructor(){}
    ngOnInit() {

        this.textColor=this.Color
        
        
    }
}