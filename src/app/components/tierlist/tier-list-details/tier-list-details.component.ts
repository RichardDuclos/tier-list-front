import {AfterViewInit, Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TierList} from "../../../models/tierlist.model";
import {UserService} from "../../../services/repositories/users/user.service";
import {TierlistService} from "../../../services/repositories/tierlist/tierlist.service";
import {FormInputBase} from "../../shared/forms/model/FormInputBase";
import {FormTextbox} from "../../shared/forms/model/FormTextbox";
import {Validators} from "@angular/forms";
import {DynamicFormComponent} from "../../shared/forms/dynamic-form/dynamic-form.component";
import {Rank} from "../../../models/Rank";
import {RankService} from "../../../services/repositories/rank/rank.service";
import {th} from "date-fns/locale";
import {Element} from "../../../models/element.model";
import {ElementService} from "../../../services/repositories/element/element.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {SecurityService} from "../../../services/security/security.service";
import {User} from "../../../models/user.model";

@Component({
  selector: 'app-tier-list-details',
  templateUrl: './tier-list-details.component.html',
  styleUrls: ['./tier-list-details.component.scss']
})
export class TierListDetailsComponent implements OnInit {
  canEdit: boolean = false;

  imageData: any;
  selectRank:  { key: string; value: string; }[] = [];
  rankForm: FormInputBase<string | boolean>[] = [
    new FormTextbox({
      key: 'name',
      label: 'Nom',
      required: true,
      validators: [
        Validators.maxLength(30)
      ]
    }),
    new FormInputBase({
      controlType: 'colorPicker',
      key: 'color',
      label: 'Couleur de fond',
      required: true,
      validators: [
        Validators.maxLength(30)
      ]
    })
  ];
  elementForm: FormInputBase<string | boolean>[] = [];
  @ViewChild("rank") dynamicRankForm?: DynamicFormComponent;
  @ViewChild("element") dynamicElementForm?: DynamicFormComponent;
  private user?: User | null;
  constructor(
    private route: ActivatedRoute,
    private tierListService: TierlistService,
    private rankService: RankService,
    private elementService: ElementService,
    private _sanitizer: DomSanitizer,
    private securityService: SecurityService,
  ) {

  }
  tierList?: TierList;
  ngOnInit() {
    this.user = this.securityService.getUserData();
    if(!this.user) {
      this.securityService.logout();
    }
    this.fetchData()
  }

  elementSubmit: Function = () => {
    if (!this.dynamicElementForm || !this.dynamicElementForm.form || !this.imageData) {
      return;
    }
    let element: Element = {
      tag: this.dynamicElementForm.form.controls.tag.value,
      rank: {
        id: this.dynamicElementForm.form.controls.rank.value
      }
    };
    element.imageData = this.imageData;
    this.elementService.create(element)
      .subscribe((element: Element) => {
        this.fetchData();
      })
  }
  rankSubmit: Function = () => {
    console.log(this.dynamicRankForm?.form)
    if (!this.dynamicRankForm || !this.dynamicRankForm.form) {
      return;
    }
    let rank: Rank = {
      name: this.dynamicRankForm.form.controls.name.value,
      color: '#' + this.dynamicRankForm.form.controls.color.value.hex
    }
    rank.tierlist = {
      id: this.tierList!.id
    };
    console.log()
    this.rankService.create(rank)
      .subscribe((rank: Rank) => {
        this.fetchData();
      })
  }
  sortRanks(tierList: TierList) {
    tierList.ranks = tierList.ranks!.sort((a, b) => a.order! - b.order!)
    return tierList;
  }
  fetchData() {
    this.tierListService.get(this.route.snapshot.params.id)
      .subscribe((tierList: TierList) => {
        this.canEdit = (tierList.draft === true && tierList.owner!.id === this.user!.id);
        this.tierList = this.sortRanks(tierList)
        this.selectRank = [];
        tierList!.ranks!.forEach((rank: Rank) => {
          this.selectRank.push({key: rank.id!, value: rank.name!})
        })
        this.elementForm = [
          new FormTextbox({
            key: 'tag',
            label: 'Tag',
            required: true,
            validators: [
              Validators.maxLength(30)
            ]
          }),
          new FormInputBase({
            key: 'rank',
            controlType: 'dropdown',
            label: 'Rang',
            required: true,
            options: this.selectRank
          })
        ];
      })
  }

  lowerOrder(rank: Rank) {
    rank.order = rank.order! - 1;
    this.rankService.update(rank)
      .subscribe((rank: Rank) => {
        this.fetchData();
      })

  }

  higherOrder(rank: Rank) {
    rank.order = rank.order! + 1;
    this.rankService.update(rank)
      .subscribe((rank: Rank) => {
        this.fetchData();
      })
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = async (e: any) => {
        this.imageData = this._arrayBufferToBase64(e.target.result);
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  _arrayBufferToBase64( buffer: ArrayBuffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  getImagePath(imageData: string | ArrayBuffer | undefined): SafeResourceUrl {
    if(typeof imageData !== "string") {
      return "";
    }
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + imageData);
  }

  publish(tierList: TierList) {
    if(!this.canEdit) {
      return;
    }
    tierList.draft = false;
    this.tierListService.update(tierList)
      .subscribe((tierList: TierList) => {
        this.fetchData();
      })
  }
}
