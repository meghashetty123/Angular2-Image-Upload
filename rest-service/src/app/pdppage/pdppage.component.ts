import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Observable'
import { StyleFinderService } from '../services/style-finder.service';
import { ItemsEntity } from '../models/itemsEntity';
import { BiglotsImage } from '../models/biglotsimage';
import { SelectionPayload } from '../models/selectionpayload';
import { SelectionRootEntity } from '../models/selectionRootEntity';
import { DBResponse } from '../models/dbresponse';
import { ArticleResponse } from '../models/articleResponse';
import { Store,select } from '@ngrx/store';
import { ColorsEntity } from '../models/colorsentity';
import { ConceptsEntity } from '../models/conceptsEntity';
import { Payload } from '../models/payload';
import { Input } from '../models/input';
import { Data1 } from '../models/data1';
import { Image } from '../models/image';
import { Style } from '../models/style';
import { and } from '@angular/router/src/utils/collection';
import { NgxCarousel } from 'ngx-carousel';


@Component({
  selector: 'app-pdppage',
  templateUrl: './pdppage.component.html',
  styleUrls: ['./pdppage.component.css']
})
export class PdppageComponent implements OnInit {

  public carouselOne: NgxCarousel;
   public    imageUrls:BiglotsImage;
    public imageList:ItemsEntity[]=[];
    public itemResponse:DBResponse;
    public itemList:ArticleResponse[]=[];
    inputImages: Observable<string[]>;
    public inputImageList:string[]=[];
    public sofaImageList:ItemsEntity[]=[];
    public chairImageList:ItemsEntity[]=[];
    public bedImageList:ItemsEntity[]=[];
    public rugImageList:ItemsEntity[]=[];
    public pillowImageList:ItemsEntity[]=[];
    public lampImageList:ItemsEntity[]=[];

    public sofa_found:boolean;
    public bed_found:boolean;
    public chair_found:boolean;
    public rug_found:boolean;
    public pillow_found:boolean;
    public lamp_found:boolean;
    public sofa_found_once:boolean=false;
    public chair_found_once:boolean=false;
    public tvstand_found_once:boolean=false;
    public bed_found_once:boolean=false;
    public rug_found_once:boolean=false;
    public pillow_found_once:boolean=false;
    public lamp_found_once:boolean=false;
    public category;
    counter:number=0;
  //Styles variable.
 
  styleColor:ColorsEntity[];
  styleConcept:ConceptsEntity[];
  stylePattern:ConceptsEntity[];
  

  constructor(private styleService:StyleFinderService,private router:Router,private route:ActivatedRoute,private imageStore:Store<string[]>) {
    this.inputImages = this.imageStore.pipe(select('imagestate'));
   }

  ngOnInit() {

    this.carouselOne = {
      grid: {xs: 1, sm: 1, md: 3, lg: 2, all: 0},
      slide: 2,
      speed: 400,
      interval: 10000,
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      loop: true,
      animation: 'lazy',
    easing: 'ease',
      custom: 'banner'
    } 


    this.sofa_found=false;
    this.bed_found=false;
    this.chair_found=false;
    this.rug_found=false;
    this.pillow_found=false;

    this.sofa_found_once=false;
    this.bed_found_once=false;
    this.chair_found_once=false;
    this.rug_found_once=false;
    this.pillow_found_once=false;
    this.lamp_found_once=false;
    
    this.inputImages.subscribe(data=>{this.inputImageList=data;});
    this.route.paramMap.subscribe(params => {
      console.log("Parameter:",params.get('Id'));
       this.category=params.get('Id');
       this.processAll_Images();
    });
    // this.processAll_Images();
   
    

   /* let itemurl="http://hnwvq-cumweb01/CIP/metadata/search/webimage/fields?user=ImageStateMachine&password=bi9lot5!&serveraddress=hnwvq-cumapp01&querystring='{af4b2e00-5f6a-11d2-8f20-0000c0e166dc}:Record Name' ? '810258634'";

     this.styleService.getBiglotsImage(url).then( res=> {this.getJson(res,"pattern")})
     .catch(err => {this.handleError(err)})
  */
  }

  public myfunc(event: Event) {
    // carouselLoad will trigger this funnction when your load value reaches
    // it is helps to load the data by parts to increase the performance of the app
    // must use feature to all carousel
 }
  processAll_Images()
  {

    this.executeStyleService();
    
}
getColorCriteria(v_pattern:string,return_str:string,value:string):string
{
  let pattern="/"+v_pattern+"";

  
  var v_match:string[]=[];
   //v_match=value.match(pattern);
   //value.indexOf( v_pattern ) 

  if (value.indexOf( v_pattern )>-1)
     { 
       if (return_str.length >0)
       {
        return_str= return_str +",'"+v_pattern+"'";
       }
       else{
        return_str= "in('"+v_pattern+"'";
       }
      }
  return return_str;
}
 getArticleForTheImages()
 {
  let itemurl="http://devpodsap.cns.com:8040/RESTAdapter/api/atg/articlelookup";

  var selectionPayLoad:SelectionPayload;
  selectionPayLoad=new SelectionPayload();
   var selectionRoot:SelectionRootEntity;
    selectionRoot= new  SelectionRootEntity();
    var sel_fields ="select SKU_ID, OVERRIDE_PRODUCT_TITLE, true_color_desc from  ATG_PUB.extn_sku where";
    var  sofa_where_conditon="";
    var  bed_where_conditon="";
    var  rug_where_conditon="";
    var  pillow_where_conditon="";
    var  lamp_where_conditon="";
    var  chair_where_conditon="";
    var sofa_found:boolean=false;
    var chair_found:boolean=false;
    var tvstand_found:boolean=false;
    var bed_found:boolean=false;
    var rug_found:boolean=false;
    var pillow_found:boolean=false;
    var lamp_found:boolean=false;

   
    let pillow_rug_pattern="";
    let v_color="";
    for (var i=0; i< 2 ;i++)
    {
       var v_pattern_uppercase:string=this.stylePattern[i].name.toLocaleUpperCase();
       
       
      pillow_rug_pattern= pillow_rug_pattern+ " OR ((upper(OVERRIDE_PRODUCT_TITLE) like '%"+v_pattern_uppercase+"%'))";

    }
    
    for (var i=0; i< this.styleColor.length ;i++)
    {
      if ( i>3)
      {
        break;
      }
     
     v_color= this.getColorCriteria("Black",v_color,this.styleColor[i].w3c.name);
      
      
     v_color= this.getColorCriteria("White",v_color,this.styleColor[i].w3c.name);
     v_color= this.getColorCriteria("Blue",v_color,this.styleColor[i].w3c.name);
     v_color= this.getColorCriteria("Tan",v_color,this.styleColor[i].w3c.name);
     v_color= this.getColorCriteria("Brown",v_color,this.styleColor[i].w3c.name);
     v_color= this.getColorCriteria("Gray",v_color,this.styleColor[i].w3c.name);
     v_color= this.getColorCriteria("Black",v_color,this.styleColor[i].w3c.name);

     
     
       
     }

     if (v_color.length >0)
     {
       v_color=v_color+")";
     }


    console.log("Pattern:",pillow_rug_pattern);
    console.log("Color:",v_color);

    for (var i=0; i< this.styleConcept.length ;i++)
    {
      /*
      if (i >10)
      break;
      */
      if((this.styleConcept[i].name ==='sofa') && (this.category==='Living'))
      { 
        
       // if (chair_found || sofa_found || tvstand_found  || bed_found || rug_found || pillow_found)
        //{
        //  where_conditon  = where_conditon+" OR (upper(OVERRIDE_PRODUCT_TITLE) like '%SOFA%'  and merchcat_subclass in ('60801002', '60801003', '60801004', '60801009'))";
        //}
       // else
        
          sofa_where_conditon=" (upper(OVERRIDE_PRODUCT_TITLE) like '%SOFA%'  and merchcat_subclass in ('60801002', '60801003', '60801004', '60801009'))";
        
        sofa_found=true;
        
      }

     
      else if(this.styleConcept[i].name ==='chair')
      {
       // if (chair_found || sofa_found || tvstand_found  || bed_found || rug_found || pillow_found)
       // {
       //   where_conditon  =where_conditon+ " OR (upper(OVERRIDE_PRODUCT_TITLE) like '%CHAIR%'  AND  merchcat_subclass in ('60801002', '60801003', '60801004', '60801009') )";
       // }
       
        
          chair_where_conditon = "  (upper(OVERRIDE_PRODUCT_TITLE) like '%CHAIR%' AND  merchcat_subclass in ('60802001' , '60802002', '60802003', '60803001', '60803002', '60803004', '60803005') )";

        
        chair_found=true;
      }
      else if(this.styleConcept[i].name ==='bed'  && this.category==='Bed')
      { 
        /*
        if (chair_found || sofa_found || tvstand_found  || bed_found || rug_found || pillow_found)
        {
          where_conditon  =where_conditon+ " OR (upper(OVERRIDE_PRODUCT_TITLE) like '%BEDROOM%'  ) "+ pillow_rug_pattern;
        }
       */
       // else{
          bed_where_conditon = "  (upper(OVERRIDE_PRODUCT_TITLE) like '%BEDROOM%' ) "+ pillow_rug_pattern;

        
        bed_found=true;
      }
      else if(this.styleConcept[i].name ==='rug')
      { /*
        if (chair_found || sofa_found || tvstand_found  || bed_found || rug_found || pillow_found)
        {
          where_conditon  =where_conditon+ " OR (((upper(OVERRIDE_PRODUCT_TITLE) like '%RUG%' "+pillow_rug_pattern+" AND merchcat_subclass in  ('35081001', '35081002', '35081003', '35081005', '35081009', '35081010'  ))";
        }
       
        else{
      */
          //rug_where_conditon = "  (upper(OVERRIDE_PRODUCT_TITLE) like '%RUG%' "+pillow_rug_pattern+"  AND merchcat_subclass in  ('35081001', '35081002', '35081003', '35081005', '35081009', '35081010'  ))";
          rug_where_conditon = "  (upper(OVERRIDE_PRODUCT_TITLE) like '%RUG%' "+"  AND merchcat_subclass in  ('35081001', '35081002', '35081003', '35081005', '35081009', '35081010'  ))";

        
        rug_found=true;
      }
      else if(this.styleConcept[i].name ==='pillow')
      { /*
        if (chair_found || sofa_found || tvstand_found  || bed_found || rug_found || pillow_found)
        {
          where_conditon  =where_conditon+ " OR (upper(OVERRIDE_PRODUCT_TITLE) like '%PILLOW%'  AND merchcat_subclass in  ('35078002', '35078006', '35078012','61005003', '35019001', '35019002', '35019003', '35019004'))";
        }
       
        else{
          */
          pillow_where_conditon = "  (upper(OVERRIDE_PRODUCT_TITLE) like '%PILLOW%' "+pillow_rug_pattern+" AND merchcat_subclass in  ('35078002', '35078006', '35078012','61005003', '35019001', '35019002', '35019003', '35019004'))";

        
        pillow_found=true;
      }
      else if(this.styleConcept[i].name ==='lamp')
      { /*
        if (chair_found || sofa_found || tvstand_found  || bed_found || rug_found || pillow_found)
        {
          where_conditon  =where_conditon+ " OR (upper(OVERRIDE_PRODUCT_TITLE) like '%LAMP%'  AND merchcat_subclass in  ('35078002', '35078006', '35078012','61005003', '35019001', '35019002', '35019003', '35019004'))";
        }
       
        else{
          */
          lamp_where_conditon = "  (upper(OVERRIDE_PRODUCT_TITLE) like '%LAMP%' )";

        
        lamp_found=true;
      }
           
    }
/*
    if ((sofa_found || bed_found) && (v_color.length >0))
    {
      console.log("Sofa Found ,Color",v_color);
      where_conditon="(("+where_conditon+") AND  TRUE_COLOR_DESC "+v_color+")"
      console.log("Final Where Condition ",where_conditon);
    } 
    */
   // selectionRoot.SQL_Query="select SKU_ID, OVERRIDE_PRODUCT_TITLE, true_color_desc from  ATG_PUB.extn_sku where upper(OVERRIDE_PRODUCT_TITLE) like '%SOFA%'  and merchcat_subclass in ('60801002', '60801003', '60801004', '60801009') and true_color_desc in ('Brown','Blue')";

   if(sofa_found  &&  this.sofa_found_once===false)
   {
      this.sofa_found_once=true;
     selectionRoot.SQL_Query=sel_fields + sofa_where_conditon;

    console.log("Sofa Selection Criterida:",selectionRoot.SQL_Query);
    selectionPayLoad.root=selectionRoot;

     this.styleService.getBiglotsItem(selectionPayLoad,itemurl).subscribe( res=> {this.setItemList(res,'sofa');});
   }
    
   if(bed_found &&  this.bed_found_once===false)
   {
    this.bed_found_once=true;
     selectionRoot.SQL_Query=sel_fields + bed_where_conditon;

    console.log("Bed Selection Criterida:",selectionRoot.SQL_Query);
    selectionPayLoad.root=selectionRoot;

     this.styleService.getBiglotsItem(selectionPayLoad,itemurl).subscribe( res=> {this.setItemList(res,'bed');});
   }
   if(chair_found && this.chair_found_once===false)
   {
    this.chair_found_once=true
     selectionRoot.SQL_Query=sel_fields + chair_where_conditon;

    console.log("Chair Selection Criterida:",selectionRoot.SQL_Query);
    selectionPayLoad.root=selectionRoot;

     this.styleService.getBiglotsItem(selectionPayLoad,itemurl).subscribe( res=> {this.setItemList(res,'chair');});
   }
   if(rug_found && this.rug_found_once===false)
   {

    this.rug_found_once=true;
     selectionRoot.SQL_Query=sel_fields + rug_where_conditon;

    console.log("Rug Selection Criterida:",selectionRoot.SQL_Query);
    selectionPayLoad.root=selectionRoot;

     this.styleService.getBiglotsItem(selectionPayLoad,itemurl).subscribe( res=> {this.setItemList(res,'rug');});
   }
   if(pillow_found && this.pillow_found_once===false)
   {
    this.pillow_found_once=true
     selectionRoot.SQL_Query=sel_fields + pillow_where_conditon;

    console.log("Pillow Selection Criterida:",selectionRoot.SQL_Query);
    selectionPayLoad.root=selectionRoot;

     this.styleService.getBiglotsItem(selectionPayLoad,itemurl).subscribe( res=> {this.setItemList(res,'pillow');});
   }

   if(lamp_found && this.lamp_found_once===false)
   {
    this.lamp_found_once=true
     selectionRoot.SQL_Query=sel_fields + lamp_where_conditon;

    console.log("Lamp Selection Criterida:",selectionRoot.SQL_Query);
    selectionPayLoad.root=selectionRoot;

     this.styleService.getBiglotsItem(selectionPayLoad,itemurl).subscribe( res=> {this.setItemList(res,'lamp');});
   }

 }
 getImagesFromBiglots(skuId:string,type:string)
 {
  let itemurl="http://hnwvq-cumweb01/CIP/metadata/search/webimage/fields?user=ImageStateMachine&password=bi9lot5!&serveraddress=hnwvq-cumapp01&querystring='{af4b2e00-5f6a-11d2-8f20-0000c0e166dc}:Record Name' ? '";
        
       itemurl= itemurl+skuId;
         itemurl=itemurl+"'";
         console.log("Item URL",itemurl);
         this.styleService.getBiglotsImage(itemurl).subscribe( res=> {this.setImages(res,skuId,type)});
          
}  
  
 

  setItemList(res,type)
  {
  // this.counter++;
    //console.log("Calling SetItemList",this.counter);
    const data=res; 

  //const newdata = JSON.parse(data);
 // console.log("ItemResponse",res);
  this.itemResponse=res.json();
  this.itemList=this.itemResponse.ATG_ArticleLookup_Response.root;
  //console.log("ItemList",this.itemList);
 // console.log("Input Image Array Size",this.itemList.length);
    
  // console.log("Starting to get the Images");
          if  (this.itemList.length >0 )
          {
            

             for (var i=0; i<10; i++){
                  this.getImagesFromBiglots(this.itemList[i].SKU_ID,type);
        
                }
          }

  }

  setImages(res,skuId:string,type:string)
 {
   this.counter++;
  //console.log("Calling setImages",this.counter);
  const data=res; 


  var v_imageUrls:BiglotsImage; 
   v_imageUrls=this.imageUrls=res.json();
  // console.log("Getting Image for Article:",skuId);
  //console.log("Image Array",v_imageUrls.items.length);


  

 var lv_item:ItemsEntity;
 var lv_article:string;
 if ( v_imageUrls.items.length >0 )
 {
  for (var i=0; i<1; i++){
   
    let lv_href="http://www.biglots.com/product/p";
    
     
     lv_item= v_imageUrls.items[i];
     lv_article='';
    lv_article =lv_item['SKU/Article'];
    var lv_arr_article;
     lv_arr_article= lv_article.split(/\r?\n/);
    // console.log("Article:",lv_arr_article[lv_arr_article.length - 1]);
    // console.log("Article:",lv_article[0]);
    //console.log("Article:",lv_article);
    //console.log("Article: End");

    if (v_imageUrls.items[i].Destination.length >0 )
    {
    let lv_url= this.imageUrls.items[i].Destination.substring(5,v_imageUrls.items[i].Destination.length);
    lv_url="http://www.biglots.com/"+lv_url;
    lv_href=lv_href+ lv_arr_article[0] +"?source=igodigital";
    v_imageUrls.items[i].Destination=lv_url;
    v_imageUrls.items[i].RecordName=lv_href;
  
    if (type==='sofa')
    {
       this.sofa_found=true;
      this.sofaImageList.push(v_imageUrls.items[i]);
    }
    if (type==='bed')
    {
      this.bed_found=true;
      this.bedImageList.push(v_imageUrls.items[i]);
    }
    if (type==='chair')
    {
      this.chair_found=true;
      this.chairImageList.push(v_imageUrls.items[i]);
    }
    if (type==='rug')
    {
      this.rug_found=true;
      this.rugImageList.push(v_imageUrls.items[i]);
    }
    if (type==='pillow')
    {
      this.pillow_found=true;
      this.pillowImageList.push(v_imageUrls.items[i]);
    }
    if (type==='lamp')
    {
      this.lamp_found=true;
      this.lampImageList.push(v_imageUrls.items[i]);
    }
  
   
    console.log("HRef:",lv_href);
    }
  }
  }
 
 }

 executeStyleService()
  {
    var styleinput_single:Input = new Input();
    var styledata1:Data1= new Data1();
    var styleimage:Image = new Image();
    var stylebody:Payload = new Payload();
    var base64File:string;
    if (this.inputImageList ===undefined)
       {
         return;
       }
      // console.log("Input Image Count:",this.inputImageList.length);
   // for (var i=0; i<this.inputImageList.length; i++)
    
   for (var i=0; i<this.inputImageList.length; i++)
    {
     if (i >2) break;
     base64File= this.inputImageList[i];

   // console.log("Base64 Image:",base64File);
   if (base64File.length >1000)
   {
    styleimage.base64=base64File.substring(23,base64File.length)

   }
  else
  {
    styleimage.url=base64File;
  }


    //this.image.base64=this.base64File.split(',')[1];
    
   
    styledata1.image =styleimage;
    styleinput_single.data=styledata1;
    var styleinput_load:Input[]=[styleinput_single];
   
    stylebody.inputs=styleinput_load;
    //console.log("payload:",stylebody.inputs);
   
       
   let post_url ='https://api.clarifai.com/v2/models/eeed0b6733a644cea07cf4c60f87ebb7/outputs'; //Color
     this.styleService.getStyles(stylebody,post_url).then( res=> {this.getColor(res,stylebody)})
     .catch(err => {this.handleError(err)})

    
   
    
    /* this.styleData = this.style.Data.ConceptsEntity; */
    }
     
  }

  
 getColor(res,body:Payload)
 {
  const data=res['_body']; 

  const newdata = JSON.parse(data);
  var style:Style=newdata;
  //console.log("Calling style Service"+res);
  
  
  this.styleColor=style.outputs[0].data.colors;
    //post_url ='https://api.clarifai.com/v2/models/fbefb47f9fdb410e8ce14f24f54b47ff/outputs'; //Pattern
   var  post_url = 'https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/outputs'; //Genral
    this.styleService.getStyles(body,post_url).then( res=> {this.getConcept(res,body)})
    .catch(err => {this.handleError(err)})


   //this.getArticleForTheImages();
   //console.log("Starting  getting Article");
  
    
 }

 getConcept(res,body:Payload)
 {
  const data=res['_body']; 

  const newdata = JSON.parse(data);
  var style:Style=newdata;
  //console.log("Calling style Service"+res);
  
  
  this.styleConcept=style.outputs[0].data.concepts;

  var post_url ='https://api.clarifai.com/v2/models/fbefb47f9fdb410e8ce14f24f54b47ff/outputs'; //Pattern
  this.styleService.getStyles(body,post_url).then( res=> {this.getPattern(res,body)})
  .catch(err => {this.handleError(err)})


   //this.getArticleForTheImages();
   //console.log("Starting  getting Article");
  
    
 }


 getPattern(res,body:Payload)
 {
  const data=res['_body']; 

  const newdata = JSON.parse(data);
  var style:Style=newdata;
  //console.log("Calling style Service"+res);
  
  
  this.stylePattern=style.outputs[0].data.concepts;
  
 

   this.getArticleForTheImages();
   //console.log("Starting  getting Article");
  
    
 }
 handleError(err)
 {
  //console.log("Calling style Service",err);
 }


}
