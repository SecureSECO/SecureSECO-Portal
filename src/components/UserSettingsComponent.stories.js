import UserSettingsComponent from './UserSettingsComponent.vue';

export default {
  title: 'UserSettingsComponent',
  component: UserSettingsComponent,
};


export const Primary = () => ({
  components: { UserSettingsComponent },
  template: '<UserSettingsComponent />',
});

