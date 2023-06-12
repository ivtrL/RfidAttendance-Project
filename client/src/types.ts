// BASIC TYPES

export interface Admin {
  id?: number;
  admin_name?: string;
  admin_email?: string;
  admin_password?: string;
}

export interface User {
  id?: number;
  username?: string;
  gender?: string;
  email?: string;
  card_uid?: string;
  user_date?: string;
  add_card?: number;
}

export interface Device {
  id?: number;
  device_name?: string;
  device_uid?: string;
  device_date?: string;
}

export interface UserLog {
  id?: number;
  username?: string;
  card_uid?: string;
  device_uid?: string;
  checkindate?: string;
  timein?: string;
  timeout?: string;
}

// COMPONENT TYPES

// NAVBAR
export interface NavbarProps {
  Route: string;
}

// SHEET
export interface SheetProps {
  List: Array<UserLog | User | Device>;
  Keys: Array<string>;
  RemoveButton?: boolean;
}

//

// ROUTES TYPES

export interface DeviceAdding {
  username: string;
}

export interface Login {
  email: string;
  password: string;
}
