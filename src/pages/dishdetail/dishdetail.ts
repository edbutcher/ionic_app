import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../../pages/comment/comment';

/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {

  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private favoriteservice: FavoriteProvider,
    private toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    @Inject('BaseURL') private BaseURL) {

      this.dish = navParams.get('dish');
      this.favorite = favoriteservice.isFavorite(this.dish.id);
      this.numcomments = this.dish.comments.length;
      let total = 0;
      this.dish.comments.forEach(comment => total += comment.rating );
      this.avgstars = (total/this.numcomments).toFixed(2);
  }

  addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message: `Dish ${this.dish.id} added as favorite successfully`,
      position: 'middle',
      duration: 3000
    }).present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  openMenu() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Actions',
      buttons: [
        {
          text: 'Add to Favorites',
          handler: () => {
            this.addToFavorites();
          }
        },
        {
          text: 'Add a Comment',
          handler: () => {
            let modal = this.modalCtrl.create(CommentPage);
            modal.onDidDismiss(data => {
              if (data) this.dish.comments.push(data);
            });
            modal.present();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
