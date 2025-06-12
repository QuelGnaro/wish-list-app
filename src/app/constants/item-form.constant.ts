import { __values } from "tslib";
import { IForm } from "../interface/form.interface";

export const itemFormConfig: IForm = {
  formTitle: 'Aggiungi un Wish',
  saveBtnLabel: 'Crea',
  resetBtnLabel: 'Reset',
  formControls: [
    {
      "name": "itemName",
      "label": "Nome",
      "value": "",
      "placeholder": "Inserisci il nome del prodotto",
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
      "label": "Link al prodotto",
      "value": "",
      "placeholder": "Inserisci il link al prodotto",
      "class": "col-md-4",
      "type": "text",
      "validators": [
      ]
    },
    {
      "name": "imageUrl",
      "label": "URL immagine",
      "value": "",
      "placeholder": "Inserisci l'URL dell'immagine",
      "class": "col-md-4",
      "type": "text",
      "validators": [
      ]
    },

    {
      "name": "targetPrice",
      "label": "Prezzo",
      "value": "",
      "placeholder": "Inserisci il prezzo",
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
      "label": "Quantità",
      "value": "",
      "placeholder": "Inserisci la quantità",
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
      "label": "Tipo",
      "placeholder": "Seleziona il tipo",
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
      "label": "Categoria",
      "placeholder": "Seleziona la categoria",
      "class": "col-md-4",
      "type": "select",
      "options": [],
      "validators": [{
        "validatorName": "required",
        "required": true,
        "message": "Category is required"
      }]
    },
    {
      "name": "description",
      "label": "Descrizione",
      "value": "",
      "placeholder": "Inserisci la descrizione",
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