import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/shared/services/posts.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {


  message:String;

  messageForm = new FormGroup({
    name : new FormControl(''),
    email: new FormControl(''),
    text: new FormControl(''),
    telefono: new FormControl(''),

});


  constructor(private postService:PostsService,private route :Router) { }

  ngOnInit(): void {
  }


  onPost(){
    this.postService.postMessage(this.messageForm.value).subscribe(data=>{
      this.message="Tu mensaje ha sido enviado con éxito!!";
      setTimeout(()=>{
        this.route.navigateByUrl("/home");
      },3000);

  },
    error=> console.log("Un error durante el post :"+error))
  }
}
