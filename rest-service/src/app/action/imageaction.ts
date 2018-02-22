import { Action } from '@ngrx/store';

export const ADD =  'ADD';
export const LOAD = 'LOAD';
export const INIT = 'INIT';


export class LoadAction implements Action {
    readonly type = LOAD;
  
    constructor(public payload: string[]) { }
  }
  
  export class AddAction implements Action {
    readonly type = ADD;
  
    constructor(public payload: string) { }
  }

  export class InitAction implements Action {
    readonly type = INIT;
  
    constructor() { }
  }


  /**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
= LoadAction
| AddAction
| InitAction;