import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  commentForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder) {

        this.commentForm = this.formBuilder.group({
          author: ['', Validators.required],
          rating: 5,
          comment: ['', Validators.required],
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }

  onSubmit() {
    let commentData = this.commentForm.value;
    commentData.date = new Date().toISOString();
    this.viewCtrl.dismiss(commentData);
  }

}
