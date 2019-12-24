const globalSelectors = {
  getOrganizations: state => state.global.organizations.list,
  getStates: state => state.global.states.list,
};

export default globalSelectors;
