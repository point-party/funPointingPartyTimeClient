import { POINTER } from '../../constants/roles';

export const CHANGE_ROLE = 'CHANGE_ROLE';

export function changeRole(role) {
  return { type: CHANGE_ROLE, payload: { role } };
}

export default function role(state = POINTER, action) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_ROLE:
      return payload.role;
    default:
      return state;
  }
}
