import {Component, OnInit, ViewChild} from '@angular/core';
import {TierlistService} from "../../services/repositories/tierlist/tierlist.service";
import {User} from "../../models/user.model";
import {TierList} from "../../models/tierlist.model";
import {SecurityService} from "../../services/security/security.service";
import {FormInputBase} from "../shared/forms/model/FormInputBase";
import {FormTextbox} from "../shared/forms/model/FormTextbox";
import {Validators} from "@angular/forms";
import {DynamicFormComponent} from "../shared/forms/dynamic-form/dynamic-form.component";
import {th} from "date-fns/locale";
import {TierListDetailsComponent} from "../tierlist/tier-list-details/tier-list-details.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  tierLists?: TierList[];
  isChecked = false;
  user?: User;
  @ViewChild("tierList") dynamicRankForm?: DynamicFormComponent;
  tierListForm: FormInputBase<string | boolean>[] = [
    new FormTextbox({
      key: 'name',
      label: 'Nom',
      required: true,
      validators: [
        Validators.maxLength(30)
      ]
    }),
    new FormTextbox({
      key: 'description',
      label: 'Description',
      required: true,
      validators: [
        Validators.maxLength(30)
      ]
    })
  ];
  tierListSubmit: Function = () => {
    if (!this.dynamicRankForm || !this.dynamicRankForm.form) {
      return;
    }
    const tierList: TierList = this.dynamicRankForm!.form!.value;
    this.tierListService.create(tierList)
      .subscribe((tierList: TierList) => {
        this.fetchData()
      });

  };
  constructor(
    private tierListService: TierlistService,
    private securityService: SecurityService,
  ) {
  }

  ngOnInit() {
    const user = this.securityService.getUserData();
    if(user == null) {
      this.securityService.logout();
    }
    this.user = user!!;
    this.fetchData();
  }
  fetchData() {
    this.tierListService.getAll().subscribe(
      (tierLists: TierList[]) => {
        this.tierLists = tierLists;
      }
    );
  }

}
