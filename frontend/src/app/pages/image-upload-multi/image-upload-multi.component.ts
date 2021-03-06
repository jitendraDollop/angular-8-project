import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms';
  
@Component({
  selector: 'app-image-upload-multi',
  templateUrl: './image-upload-multi.component.html',
  styleUrls: ['./image-upload-multi.component.css']
})
export class ImageUploadMultiComponent {
   images = [];
   myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
   
  constructor(private http: HttpClient) { }
   
  get userReg(){
    return this.myForm.controls;
  }
   
  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
   
                reader.onload = (event:any) => {
                  // console.log(event.target.result);
                   this.images.push(event.target.result); 
   
                   this.myForm.patchValue({
                      fileSource: this.images
                   });
                }
  
                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }
    
  submit(){
    console.log(this.myForm.value);
    
  }
}