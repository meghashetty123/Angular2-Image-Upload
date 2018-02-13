import { Component, OnInit, style } from '@angular/core';
import { StyleFinderService } from '../services/style-finder.service';


import { Style } from '../models/style';
import { ConceptsEntity } from '../models/conceptsEntity';
import { Console } from '@angular/core/src/console';
import { ColorsEntity } from '../models/colorsentity';
import { Payload } from '../models/payload';
import { Input } from '../models/input';
import { Data1 } from '../models/data1';
import { Image } from '../models/image';


@Component({
  selector: 'app-style-finder',
  templateUrl: './style-finder.component.html',
  styleUrls: ['./style-finder.component.css']
})
export class StyleFinderComponent implements OnInit {

  style:Style;

  styleColor:ColorsEntity[];
  styleConcept:ConceptsEntity[];
  stylePattern:ConceptsEntity[];
  body:Payload;
  input_load:Input[];
  input_single:Input;
  data1:Data1;
  image:Image;
  public base64Files: string[] = [];
  private files: any[] = [];
  private fileReader = new FileReader();
  public base64File:string;

  constructor(private styleService:StyleFinderService) { }

  ngOnInit() {
    //console.log("Calling style Service");
   // this.styleService.getStyles().subscribe(p=>this.style = p);
   this.getDbconnection();

  }

  public onChange(event: Event) {
    console.log("Executing onchange ");
    let files = event.target['files'];
    if (event.target['files']) {
      console.log(event.target['files']);
      this.readFiles(event.target['files'], 0);
     
   
    }
    
  };
  
  private readFiles(files: any[], index: number) {
    let file = files[index];
    this.fileReader.onload = () => {
      //this.base64Files=[];
      this.base64Files.push(this.fileReader.result);
      this.base64File=this.fileReader.result;
      console.log("From File Reader Result Base64File:",this.base64File);
      if (files[index + 1]) {
        this.readFiles(files, index + 1);
      } else {
        console.log('loaded all files');
      }
    };
    this.fileReader.readAsDataURL(file);
  }
  onSubmit()
  {
    console.log("Before service Base64File:",this.base64File);
   this.executeStyleService(); 
  }
  shopnow() {
    
  }
  getDbconnection()
  {

    /*
    var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    port: "3306"
    user: "root",
    password: "Megha123"
  });
  con.connect();
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("SELECT 1 from world.picture", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  }); */

  
  }
  executeStyleService()
  {
    this.input_single = new Input();
    this.data1= new Data1();
    this.image = new Image();
    console.log("Base64 Image:",this.base64File);

    this.image.base64=this.base64File.substring(23,this.base64File.length)
    //this.image.base64=this.base64File.split(',')[1];
    
   
    this.data1.image =this.image;
    this.input_single.data=this.data1;
    this.input_load=[this.input_single];
    this.body = new Payload();
    this.body.inputs=this.input_load;
    console.log("paylod:",this.body.inputs);
   
       
   let post_url ='https://api.clarifai.com/v2/models/eeed0b6733a644cea07cf4c60f87ebb7/outputs'; //Color
     this.styleService.getStyles(this.body,post_url).then( res=> {this.getJson(res,"color")})
     .catch(err => {this.handleError(err)})

     //post_url ='https://api.clarifai.com/v2/models/fbefb47f9fdb410e8ce14f24f54b47ff/outputs'; //Pattern
     post_url = 'https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/outputs'; //Genral
     this.styleService.getStyles(this.body,post_url).then( res=> {this.getJson(res,"general")})
     .catch(err => {this.handleError(err)})

    post_url ='https://api.clarifai.com/v2/models/fbefb47f9fdb410e8ce14f24f54b47ff/outputs'; //Pattern
     this.styleService.getStyles(this.body,post_url).then( res=> {this.getJson(res,"pattern")})
     .catch(err => {this.handleError(err)})
    
    /* this.styleData = this.style.Data.ConceptsEntity; */
   
     
  }
 getJson(res,model_style:string)
 {
  const data=res['_body']; 

  const newdata = JSON.parse(data);
  this.style=newdata;
  console.log("Calling style Service"+res);
  
  if  (model_style === "color") 
  {this.styleColor=this.style.outputs[0].data.colors;
   }
  else  if  (model_style === "general")  
  {this.styleConcept=this.style.outputs[0].data.concepts;
   }
   else{
    this.stylePattern=this.style.outputs[0].data.concepts;

   }
 }
 handleError(err)
 {
  console.log("Calling style Service"+err);
 }

 
}
