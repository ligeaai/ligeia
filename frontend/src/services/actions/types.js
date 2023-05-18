//-----------Auth---------------------
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';
export const ACTIVATION_SUCCESS = 'ACTIVATION_SUCCESS';
export const ACTIVATION_FAIL = 'ACTIVATION_FAIL';
export const USER_LOADED_SUCCESS = 'USER_LOADED_SUCCESS';
export const USER_LOADED_FAIL = 'USER_LOADED_FAIL';
export const AUTHENTICATED_SUCCESS = 'AUTHENTICATED_SUCCESS';
export const AUTHENTICATED_FAIL = 'AUTHENTICATED_FAIL';
export const PASSWORD_RESET_FAIL = 'PASSWORD_RESET_FAIL';
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_CONFIRM_FAIL = 'PASSWORD_RESET_CONFIRM_FAIL';
export const PASSWORD_RESET_CONFIRM_SUCCESS = 'PASSWORD_RESET_CONFIRM_SUCCESS';
export const GOOGLE_AUTH_SUCCESS = 'GOOGLE_AUTH_SUCCESS';
export const GOOGLE_AUTH_FAIL = 'GOOGLE_AUTH_FAIL';
export const FACEBOOK_AUTH_SUCCESS = 'FACEBOOK_AUTH_SUCCESS';
export const FACEBOOK_AUTH_FAIL = 'FACEBOOK_AUTH_FAIL';
export const LOGOUT = 'LOGOUT';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAIL = 'CHANGE_PASSWORD_FAIL';
export const GITHUB_AUTH_FAIL = 'GITHUB_AUTH_FAIL';
export const GITHUB_AUTH_SUCCESS = 'GITHUB_AUTH_SUCCESS';
export const UPDATE_USER = "UPDATE_USER"
//-----------Error---------------------
export const ADD_ERROR_SUCCESS = 'ADD_ERROR_SUCCESS';
export const ADD_ERROR_FAIL = 'ADD_ERROR_FAIL';
export const CLEAN_ERROR_SUCCESS = 'CLEAN_ERROR_SUCCESS';
export const CLEAN_ERROR_FAIL = 'CLEAN_ERROR_FAIL';
export const SNACKBAR_ERROR = "SNACKBAR_ERROR"

//-----------TAGS-----------------------
export const LOAD_TAGS_LABEL = "LOAD_TAGS_LABEL";
export const SET_TAG_SAVE_VALUES = "SET_TAG_SAVE_VALUES";
export const CLEAN_ALL_TAGS = "CLEAN_ALL_TAGS";
export const FILL_SAVE_VALUES_TAGS = "FILL_SAVE_VALUES_TAGS";
export const LOAD_ITEMS_FOR_TAGLINKS = "LOAD_ITEMS_FOR_TAGLINKS";

//-----------Code List-------------------
export const LOAD_DATAGRID_ROW_CODELIST = "LOAD_DATAGRID_ROW_CODELIST";
export const ON_CHANGE_CODELIST_CELL = "ON_CHANGE_CODELIST_CELL";
export const CLEAN_AFTER_SAVE = "CLEAN_AFTER_SAVE";
export const SET_SELECTED_ROWS = "SET_SELECTED_ROWS";
export const CLEAN_SELECTED_ROWS = "CLEAN_SELECTED_ROWS";
export const REFRESH_ROWS_CODELIST = "REFRESH_ROWS_CODELIST";
export const REFRESH_DELETECHILD_CODELIST = "REFRESH_DELETECHILD_CODELIST";
export const ADD_NEW_CHILD_CODELIST = "ADD_NEW_CHILD_CODELIST";
export const CLEAN_ALL_DATAGRID_CODELIST = "CLEAN_ALL_DATAGRID_CODELIST";
export const SET_FILTERED_LAYER_NAME_CODELIST = "SET_FILTERED_LAYER_NAME_CODELIST";

//-----------Resource List------------------
export const LOAD_DATAGRID_ROW_RESOURCELIST = "LOAD_DATAGRID_ROW_RESOURCELIST";
export const ON_CHANGE_RESOURCELIST_CELL = "ON_CHANGE_RESOURCELIST_CELL";
export const CLEAN_AFTER_SAVE_RESOURCELIST = "CLEAN_AFTER_SAVE_RESOURCELIST";
export const SET_SELECTED_ROWS_RESOURCELIST = "SET_SELECTED_ROWS_RESOURCELIST";
export const CLEAN_SELECTED_ROWS_RESOURCELIST = "CLEAN_SELECTED_ROWS_RESOURCELIST";
export const REFRESH_ROWS_RESOURCELIST = "REFRESH_ROWS_RESOURCELIST";
export const REFRESH_DELETECHILD_RESOURCELIST = "REFRESH_DELETECHILD_RESOURCELIST";
export const ADD_NEW_CHILD_RESOURCELIST = "ADD_NEW_CHILD_RESOURCELIST";
export const CLEAN_ALL_DATAGRID_RESOURCELIST = "CLEAN_ALL_DATAGRID_RESOURCELIST";
export const SET_FILTERED_LAYER_NAME_RESOURCELIST = "SET_FILTERED_LAYER_NAME_RESOURCELIST";

//------------Drawer Menu-----------------
export const SET_SELECTED_DRAWER_ITEM = "SET_SELECTED_DRAWER_ITEM";
export const LOAD_DRAWER_MENU = "LOAD_DRAWER_MENU";
export const DRAWER_MENU_SET_OPEN = "DRAWER_MENU_SET_OPEN";

//-----------Project ---------------------
export const UPDATE_DATA_PROJECT = "UPDATE_DATA_PROJECT";
export const CLEAN_PROJECT = "CLEAN_PROJECT";
export const SET_DATABASES_PROJECT = "SET_DATABASES_PROJECT"
export const LOAD_DATA_PROJECT = "LOAD_DATA_PROJECT";
export const SET_KUBERNETES_PROJECT = "SET_KUBERNETES_PROJECT";

//------------TYPE -------------------
export const SET_ROW_DATAGRID_TYPE = "SET_ROW_DATAGRID_TYPE";
export const SET_CHANGE_TYPE_VALUE_CELL_TAG = "SET_CHANGE_TYPE_VALUE_CELL_TAG";
export const AFTER_GO_INDEX_TYPE = "AFTER_GO_INDEX_TYPE";
export const SET_PROPERTY_ROW = "SET_PROPERTY_ROW";
export const CHANGE_SELECTED_ROW_PROPERTY = "CHANGE_SELECTED_ROW_PROPERTY";
export const SET_CHANGE_PROPERTY_VALUE_CELL_TAG = "SET_CHANGE_PROPERTY_VALUE_CELL_TAG";
export const DELETE_SELECTED_ITEM_PROPERTY = "DELETE_SELECTED_ITEM_PROPERTY";
export const ADD_NEW_PROPERTY = "ADD_NEW_PROPERTY";
export const SET_FILTERED_LAYER_NAME_TYPE = "SET_FILTERED_LAYER_NAME_TYPE"
export const CLEAN_ALL_DATAGRID_TYPE = "CLEAN_ALL_DATAGRID_TYPE"

//------------TREEVIEW -------------------------
export const LOAD_TREEVIEW_ITEMS = "LOAD_TREEVIEW_ITEM";
export const SELECT_TREEVIEW_ITEM = "SELECT_TREEVIEW_ITEM";
export const CLEAN_TREEVIEW_SELECT = "CLEAN_TREEVIEW_SELECT";
export const LOAD_FILTERED_TREEVIEW_ITEM = "LOAD_FILTERED_TREEVIEW_ITEM";
export const SET_FILTERED_LAYER_NAME = "SET_FILTERED_LAYER_NAME";
export const CLEAN_TREEVIEW = "CLEAN_TREEVIEW";
export const LOAD_TREE_VIEW_WIDTH = "LOAD_TREE_VIEW_WIDTH";
export const UPDATE_TREE_VIEW_WIDTH_HIERARCHY = "UPDATE_TREE_VIEW_WIDTH_HIERARCHY";

//-------------CONFIRMATION-------------------
export const SET_IS_ACTIVE_CONFIRMATION = "SET_IS_ACTIVE_CONFIRMATION";
export const SET_SAVE_FUNCTION_CONFIRMATION = "SET_SAVE_FUNCTION_CONFIRMATION";
export const SET_BODY_CONFIRMATION = "SET_BODY_CONFIRMATION";
export const SET_TITLE_CONFIRMATION = "SET_TITLE_CONFIRMATION";
export const SET_GO_FUNCTION_CONFIRMATION = "SET_GO_FUNCTION_CONFIRMATION";
export const SET_IS_OPEN_CONFIRMATION = "SET_IS_OPEN_CONFIRMATION";
export const SET_CLEAN_CONFIRMATION = "SET_CLEAN_CONFIRMATION";

//------------OVERVIEW------------------------
export const SET_SELECTED_ITEM_OVERVIEW_DIALOG = "SET_SELECTED_ITEM_OVERVIEW_DIALOG";
export const FILL_VALUES_OVERVIEW_DIALOG = "FILL_VALUES_OVERVIEW_DIALOG";
export const CHANGE_VALUE_OVERVIEW_DIALOG = "CHANGE_VALUE_OVERVIEW_DIALOG";
export const SET_SELECT_ITEM_OVERVIEW_DIALOG = "SET_SELECT_ITEM_OVERVIEW_DIALOG";
export const SET_HIGHCHART_PROPERTY_OVERVIEW_DIALOG = "SET_HIGHCHART_PROPERTY_OVERVIEW_DIALOG";
export const SET_MEASUREMENT_DATA = "SET_MEASUREMENT_DATA";
export const SET_ITEM_DATA_OVERVIEW = "SET_ITEM_DATA_OVERVIEW"
export const FILL_TAPS_OVERVIEW = "FILL_TAPS_OVERVIEW";
export const SET_SELECT_TAB_ITEM = "SET_SELECT_TAB_ITEM";
export const CLEAN_TABS_OVERVIEW = "CLEAN_TABS_OVERVIEW";
export const SET_WIDGETS_OVERVIEW = "SET_WIDGETS_OVERVIEW";
export const REFRESH_WIDGETS_OVERVIEW = "REFRESH_WIDGETS_OVERVIEW";

//------------COLLAPSABLE MENU ----------------
export const LOAD_COLLAPSABLE_MENU_ITEMS = "LOAD_COLLAPSABLE_MENU_ITEMS";
export const SET_SELECTED_COLLAPSE_MENU_ITEM = "SET_SELECTED_COLLAPSE_MENU_ITEM";
export const CLEAN_COLLAPSE_MENU = "CLEAN_COLLAPSE_MENU"
export const SET_COLLAPSE_FILTER_MENU = "SET_COLLAPSE_FILTER_MENU"

//------------ITEM -------------------
export const LOAD_TYPE_ROWS_ITEM = "LOAD_TYPE_ROWS_ITEM";
export const LOAD_ROWS_ITEM = "LOAD_ROWS_ITEM";
export const ADD_COLUMN_ITEM = "ADD_COLUMN_ITEM";
export const CLEAN_DATAGRID_ITEM = "CLEAN_DATAGRID_ITEM";
export const EDIT_DATAGRID_CELL_ITEM = "EDIT_DATAGRID_CELL_ITEM";
export const CLEAR_COLUMN_ITEM = "CLEAR_COLUMN_ITEM";
export const DELETE_COLUMN_ITEM = "DELETE_COLUMN_ITEM";
export const CLEAN_ITEM_AND_ROWS = "CLEAN_ITEM_AND_ROWS";
export const UPDATE_COL_ITEM = "UPDATE_COL_ITEM"

//------------ITEM LINK------------------
export const LOAD_LINK_EDITOR_SCHEMA_ITEM = "LOAD_LINK_EDITOR_SCHEMA_ITEM";
export const SET_IS_LINK_ACTIVE = "SET_IS_LINK_ACTIVE";
export const UPDATE_LINKS_VALUE = "UPDATE_LINKS_VALUE";
export const LOAD_CHECKLIST = "LOAD_CHECKLIST";
export const SET_CHECKED_ITEMS = "SET_CHECKED_ITEMS";
export const CLEAN_COMPANY_CHECKED_LIST = "CLEAN_COMPANY_CHECKED_LIST";
export const CLEAN_LINKS_VALUE = "CLEAN_LINKS_VALUE";

export const SET_ISCHECKED = "SET_ISCHECKED";
export const SET_UPDATE_ISCHECKED = "SET_UPDATE_ISCHECKED";

//----------STEPPER-------------
export const FILL_STEPPER_MANDATORY = "FILL_STEPPER_MANDATORY";

//----------Alarms-----------
export const TOGGLE_ALARMS = "TOGGLE_ALARMS";
export const SET_ALARMS_ITEM = "SET_ALARMS_ITEM"

//---------Diagnostic--------------------------

export const SET_ALARM_HISTORY_DIAGNOSTIC = "SET_ALARM_HISTORY_DIAGNOSTIC";
export const SET_COMMUNICATIONS_STATUS_DIAGNOSTIC = "SET_COMMUNICATIONS_STATUS_DIAGNOSTIC"
export const SET_SYSTEM_HEALTH_DIAGNOSTIC = "SET_SYSTEM_HEALTH_DIAGNOSTIC";
export const CLEAN_DIAGNOSTIC = "CLEAN_DIAGNOSTIC"

//----------Users---------------------------------

export const LOAD_USERS_LIST = "LOAD_USERS_LIST"
export const CLEAN_USERS = "CLEAN_USERS"
export const LOAD_LAYER_LIST_USERS = "LOAD_LAYER_LIST_USERS"
export const DELETE_USER = "DELETE_USER"
export const UPDATE_LAYER_USERS = "UPDATE_LAYER_USERS"
export const LOAD_ROLES_LIST_USERS = "LOAD_ROLES_LIST_USERS"


//-----------Roles------------------------------------

export const CLEAN_ROLES = "CLEAN_ROLES"
export const UPDATE_ROWS_ROLES = "UPDATE_ROWS_ROLES"
export const EDIT_CELL_ROLES = "EDIT_CELL_ROLES"
export const LOAD_ROLES_PROPERTY = "LOAD_ROLES_PROPERTY"
export const UPDATE_ROLES_NAME_PROPERTY = "UPDATE_ROLES_NAME_PROPERTY"
export const SET_LINKS_ACTIVE_ROLE = "SET_LINKS_ACTIVE_ROLE"
export const SET_LINKED_USERS_ROLE = "SET_LINKED_USERS_ROLE"

//--------Profile------------------------------
export const LOAD_PROFILE = "LOAD_PROFILE";
export const CLEAN_PROFILE = "CLEAN_PROFILE";

//-------TAG Import--------------------
export const UPDATE_PROGRESS_TAG_IMPORT = "UPDATE_PROGRESS_TAG_IMPORT"
export const TOGGLE_LOCK_TAG_IMPORT = "TOGGLE_LOCK_TAG_IMPORT"


//-------Workflow------------------
export const UPDATE_DATA_WORKFLOW = "UPDATE_DATA_WORKFLOW";
export const SET_ITEMS_WORKFLOW = "SET_ITEMS_WORKFLOW";
export const SET_CHECKET_ITEMS_WORKFLOW = "SET_CHECKET_ITEMS_WORKFLOW";
export const SET_UPDATE_CHECKED_ITEMS_WORKFLOW = "SET_UPDATE_CHECKED_ITEMS_WORKFLOW";
export const CLEAN_WORKFLOW = "CLEAN_WORKFLOW"
export const CLEAN_DATA_WORKFLOW = "CLEAN_DATA_WORKFLOW";
export const SET_TAGS_WORKFLOW = "SET_TAGS_WORKFLOW"
export const SET_CHECKED_TAGS_WORKFLOW = "SET_CHECKED_TAGS_WORKFLOW"
export const SET_UPDATE_CHECKED_TAGS_WORKFLOW = "SET_UPDATE_CHECKED_TAGS_WORKFLOW"
export const LOAD_DATA_WORKFLOW = "LOAD_DATA_WORKFLOW"

//------Prop Link-----------
export const CHANGE_PAGE = "CHANGE_PAGE"