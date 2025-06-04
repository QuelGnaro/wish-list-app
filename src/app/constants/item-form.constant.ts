import { __values } from "tslib";
import { IForm } from "../interface/form.interface";

export const itemFormConfig: IForm = {
  formTitle: 'Item form',
  saveBtnLabel: 'Crea',
  resetBtnLabel: 'Reset',
  formControls: [
    {
      "name": "itemName",
      "label": "Item Name",
      "value": "",
      "placeholder": "",
      "class": "col-md-4",
      "type": "text",
      "validators": [{
        "validatorName": "required",
        "required": true,
        "message": "Item Name is required"
      },
      {
        "validatorName": "minlength",
        "required": true,
        "message": "Item Name should be minimum 2 characters",
        "minLength": 2
      },
      {
        "validatorName": "maxlength",
        "required": true,
        "message": "Item Name should be maximum 30 characters",
        "maxLength": 30
      }]
    },
    {
      "name": "externalUrl",
      "label": "External Url",
      "value": "",
      "placeholder": "",
      "class": "col-md-4",
      "type": "text",
      "validators": [
      ]
    },
    {
      "name": "imageUrl",
      "label": "Image",
      "value": "",
      "placeholder": "",
      "class": "col-md-4",
      "type": "text",
      "validators": [{
        "validatorName": "required",
        "required": true,
        "message": "Image is required"
      },
      ]
    },

    {
      "name": "targetPrice",
      "label": "Target Price",
      "value": "",
      "placeholder": "",
      "class": "col-md-4",
      "type": "number",
      "validators": [{
        "validatorName": "required",
        "required": true,
        "message": "Target Price is required"
      },
      ]
    },
    {
      "name": "quantity",
      "label": "Quantity",
      "value": "",
      "placeholder": "",
      "class": "col-md-4",
      "type": "number",
      "validators": [{
        "validatorName": "required",
        "required": true,
        "message": "Quantity is required"
      },
      ]
    },
    {
      "name": "type",
      "label": "Item Type",
      "placeholder": "",
      "class": "col-md-4",
      "type": "select",
      "options": [{ "id": 1, "value": "WISH" }, { "id": 2, "value": "GIFT" }, { "id": 3, "value": "IMPOSSIBLE" }],
      "validators": [{
        "validatorName": "required",
        "required": true,
        "message": "Category is required"
      }]
    },
    {
      "name": "category",
      "label": "Category",
      "placeholder": "",
      "class": "col-md-4",
      "type": "select",
      "options": [{ "id": 1, "value": "Moto" }, { "id": 2, "value": "Casa" }, { "id": 3, "value": "Giochi" }],
      "validators": [{
        "validatorName": "required",
        "required": true,
        "message": "Category is required"
      }]
    },
    {
      "name": "description",
      "label": "Description",
      "value": "",
      "placeholder": "",
      "class": "col-12",
      "type": "textarea",
      "validators": [{
        "validatorName": "maxLength",
        "required": true,
        "message": "Item description should be maximum 300 characters",
        "maxLength": 300
      },
      ]
    },
  ]
};