interface Action {
  permission: string;
  styledButton: boolean;
  label: string;
  url: string;
}

const CREATE_PLAN: Action = {
  permission: 'CREATE_PLAN',
  styledButton: true,
  label: 'Tạo mới',
  url: 'new',
};

const CREATE_EXERCISE: Action = {
  permission: 'CREATE_EXERCISE',
  styledButton: true,
  label: 'Tạo mới',
  url: 'new',
};

export { CREATE_PLAN, CREATE_EXERCISE };
