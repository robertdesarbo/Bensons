export enum FormActionList {
  add = 'add',
  edit = 'edit',
  remove = 'remove'
}

export type FormAction = FormActionList.add | FormActionList.edit | FormActionList.remove;
