import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-add-technology',
  templateUrl: 'add-technology.html'
})

export class AddTechnology {

   // Define FormBuilder /model properties
   public form                   : FormGroup;
   public technologyName         : any;
   public technologyType         : any;
   public technologyDescription  : any;
   public technologyQuantity     : any;
   public technologyLocation     : any;
   public technologyStatus       : any;
      // Flag to be used for checking whether we are adding/editing an entry
   public isEdited               : boolean = false;
   // Flag to hide the form upon successful completion of remote operation
   public hideForm               : boolean = false;
   // Property to help ste the page title
   public pageTitle              : string;
   // Property to store the recordID for when an existing entry is being edited
   public recordID               : any      = null;
   private baseURI               : string  = "http://192.168.6.53/ionic/";

   // Initialise module classes
   constructor(public navCtrl    : NavController,
               public http       : Http,
               public NP         : NavParams,
               public fb         : FormBuilder,
               public toastCtrl  : ToastController)
   {

      // Create form builder validation rules
      this.form = fb.group({
         "nama"                : ["", Validators.required],
		 "jenis_barang"        : ["", Validators.required],
         "detail"        	   : ["", Validators.required],
		 "jumlah"              : ["", Validators.compose([ Validators.pattern('[0-9]*'), Validators.required])],
		 "lokasi"              : ["", Validators.required],
		 "statuse"             : ["", Validators.required]
		 
      });
      
   }



   // Determine whether we adding or editing a record
   // based on any supplied navigation parameters
   ionViewWillEnter()
   {
      this.resetFields();

      if(this.NP.get("record"))
      {
         this.isEdited      = true;
         this.selectEntry(this.NP.get("record"));
         this.pageTitle     = 'Amend entry';
      }
      else
      {
         this.isEdited      = false;
         this.pageTitle     = 'Create entry';
      }
   }



   // Assign the navigation retrieved data to properties
   // used as models on the page's HTML form
   selectEntry(item)
   {
      this.technologyName        = item.nama;
      this.technologyType 		 = item.jenis_barang;
	  this.technologyDescription = item.detail;
	  this.technologyQuantity    = item.jumlah;
	  this.technologyLocation    = item.lokasi;
	  this.technologyStatus      = item.status;
      this.recordID              = item.id;
   }



   // Save a new record that has been added to the page's HTML form
   // Use angular's http post method to submit the record data
   // to our remote PHP script (note the body variable we have created which
   // supplies a variable of key with a value of create followed by the key/value pairs
   // for the record data
   createEntry(nama, jenis_barang, detail, jumlah, lokasi, statuse)
   {
      let body       : string = "key=create&nama=" + nama + "&jenis_barang=" + jenis_barang + "&detail=" + detail + "&jumlah=" + jumlah + "&lokasi=" + lokasi + "&status=" + statuse + "&recordID=" + this.recordID,
          type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
          headers  : any      = new Headers({ 'Content-Type': type}),
          options  : any      = new RequestOptions({ headers: headers }),
          url      : any      = this.baseURI + "manage-data.php";

      this.http.post(url, body, options)
      .subscribe((data) =>
      {
         // If the request was successful notify the user
         if(data.status === 200)
         {
            this.hideForm   = true;
            this.sendNotification(`Congratulations the technology: ${nama} was successfully added`);
         }
         // Otherwise let 'em know anyway
         else
         {
            this.sendNotification('Something went wrong!');
         }
      });
   }



   // Update an existing record that has been edited in the page's HTML form
   // Use angular's http post method to submit the record data
   // to our remote PHP script (note the body variable we have created which
   // supplies a variable of key with a value of update followed by the key/value pairs
   // for the record data
   updateEntry(nama, jenis_barang, detail, jumlah, lokasi, statuse)
   {
      let body       : string = "key=create&nama=" + nama + "&jenis_barang=" + jenis_barang + "&detail=" + detail + "&jumlah=" + jumlah + "&lokasi=" + lokasi + "&status=" + statuse + "&recordID=" + this.recordID,
          type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
          headers    : any     = new Headers({ 'Content-Type': type}),
          options    : any     = new RequestOptions({ headers: headers }),
          url        : any     = this.baseURI + "manage-data.php";

      this.http.post(url, body, options)
      .subscribe(data =>
      {
         // If the request was successful notify the user
         if(data.status === 200)
         {
            this.hideForm  =  true;
            this.sendNotification(`Congratulations the technology: ${nama} was successfully updated`);
         }
         // Otherwise let 'em know anyway
         else
         {
            this.sendNotification('Something went wrong!');
         }
      });
   }



   // Remove an existing record that has been selected in the page's HTML form
   // Use angular's http post method to submit the record data
   // to our remote PHP script (note the body variable we have created which
   // supplies a variable of key with a value of delete followed by the key/value pairs
   // for the record ID we want to remove from the remote database
   deleteEntry()
   {
      let name       : string = this.form.controls["nama"].value,
          body       : string    = "key=delete&recordID=" + this.recordID,
          type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
          headers    : any    = new Headers({ 'Content-Type': type}),
          options    : any    = new RequestOptions({ headers: headers }),
          url        : any    = this.baseURI + "manage-data.php";

      this.http.post(url, body, options)
      .subscribe(data =>
      {
         // If the request was successful notify the user
         if(data.status === 200)
         {
            this.hideForm     = true;
            this.sendNotification(`Congratulations the technology: ${name} was successfully deleted`);
         }
         // Otherwise let 'em know anyway
         else
         {
            this.sendNotification('Something went wrong!');
         }
      });
   }



   // Handle data submitted from the page's HTML form
   // Determine whether we are adding a new record or amending an
   // existing record
   saveEntry()
   {
      let nama          : string = this.form.controls["nama"].value,
		  jenis_barang  : string = this.form.controls["jenis_barang"].value,
          detail	    : string    = this.form.controls["detail"].value,
		  jumlah        : string = this.form.controls["jumlah"].value,
		  lokasi        : string = this.form.controls["lokasi"].value,
		  statuse       : string = this.form.controls["statuse"].value;

      if(this.isEdited)
      {
         this.updateEntry(nama, jenis_barang, detail, jumlah, lokasi, statuse);
      }
      else
      {
         this.createEntry(nama, jenis_barang, detail, jumlah, lokasi, statuse);
      }
   }



   // Clear values in the page's HTML form fields
   resetFields() : void
   {
      this.technologyName           = "";
      this.technologyType    		= "";
	  this.technologyDescription    = "";
	  this.technologyQuantity       = "";
	  this.technologyLocation       = "";
	  this.technologyStatus         = "";
   }



   // Manage notifying the user of the outcome
   // of remote operations
   sendNotification(message)  : void
   {
      let notification = this.toastCtrl.create({
          message       : message,
          duration      : 3000
      });
      notification.present();
   }



}
