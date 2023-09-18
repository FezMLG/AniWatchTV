import { enSettings } from './categories';

export const en = {
  ...enSettings,
  routes: {
    Browse: 'Browse',
    BrowseStack: 'Browse',
    Episodes: 'Episodes',
    Login: 'Login',
    SignUp: 'Sign Up',
    ForgotPassword: 'Forgot Password',
    Search: 'Search',
    SearchStack: 'Search',
    Settings: 'Settings',
    SettingsStack: 'Settings',
    ActionConfirm: 'Confirm Action',
    SearchResults: 'Search Results',
    MyListStack: 'My List',
    OfflineStack: 'Offline',
    WatchList: 'Watch List'
  },
  forms: {
    save: 'Save',
    continue: 'Continue',
    fields: {
      displayName: 'Username',
      email: 'Email',
      NickChange: 'Username',
      EmailChange: 'example@example.com',
      PasswordChange: '*************',
    },
    labels: {
      password: 'Password',
      NickChange: 'Username',
      EmailChange: 'Email',
      PasswordChange: 'Password',
      new: {
        NickChange: 'New username',
        EmailChange: 'New email',
        PasswordChange: 'New password',
      },
    },
  },
  actions: {
    AccountDelete: {
      action_name: 'Account Delete',
      message:
        'If you are logged out, try logging in again. If the action fails, try again',
      confirm: 'I want to delete my account',
    },
  },
  text: {
    hello: 'Hello',
  },
  buttons: {
    go_back: 'Go Back',
  },
  auth: {
    login: 'Login',
    register: 'Sign up',
    forgot_password: 'Forgot password?',
    password: 'Password',
    password_again: 'Password again',
    new_user: 'New user? Join here',
    logout: 'Logout',
    username: 'Username',
    email_verify: {
      top: 'Please verify your email',
      bottom: 'and login again',
    },
    required_field: 'This field is required',
    email_sent: 'Sent email',
    email_has_been_sent: 'Email has been sent',
    errors: {
      invalid_email: 'Invalid email',
      user_not_found: 'User was not found or wrong password',
      unknown: 'Unknown error, please contact support',
      email_already_in_use: 'This user already exist',
      passwords_do_not_match: 'Passwords do not match',
      weak_password: 'Password should be at least 6 characters',
    },
    continue_with: 'or continue with',
    delete_account: 'Delete account',
  },
  welcomeScreen: {
    welcome: 'Welcome to',
    cto: 'Get started',
    apiLoading: 'Please wait, our servers are starting up',
    apiError: 'There is problem with servers',
    apiContact: 'Click here to contact us',
  },
  animeSeason: {
    winter: 'Winter',
    spring: 'Spring',
    summer: 'Summer',
    fall: 'Fall',
    WINTER: 'Winter',
    SPRING: 'Spring',
    SUMMER: 'Summer',
    FALL: 'Fall',
  },
  anime_details: {
    see_episodes: 'See episodes',
    next_episode: 'Next Episode',
    format: 'Format',
    episodes: 'Episodes',
    duration: 'Durations',
    status: 'Status',
    status_list: {
      FINISHED: 'Finished',
      RELEASING: 'Releasing',
      NOT_YET_RELEASED: 'Announced',
      CANCELED: 'Canceled',
      HIATUS: 'Paused',
    },
    score: 'Score',
    season: 'Season',
    relations: 'Relations',
    relations_list: {
      ADAPTATION: 'Adaptation',
      PREQUEL: 'Prequel',
      SEQUEL: 'Sequel',
      PARENT: 'Parent',
      SIDE_STORY: 'Side story',
      CHARACTER: 'Character',
      SUMMARY: 'Summary',
      ALTERNATIVE: 'Alternative',
      SPIN_OFF: 'Spin off',
      OTHER: 'Other',
      SOURCE: 'Source',
      COMPILATION: 'Compilation',
      CONTAINS: 'Contains',
    },
    trailer: 'Trailer',
    links: 'Links',
    source: 'Source',
  },
  watch_list: {
    watching: 'Watching',
    add: 'Add to list',
    finished: 'Watched',
  },
  anime_episodes: {
    players_not_found: 'Players not found',
    Episode: 'Episode',
    available_players: 'Available players',
    load_players: 'Load players',
    disclaimer:
      'AniWatch does not host any files on its own servers, we only provide links to content hosted on third-party servers.',
  },
  important: {
    requireAppUpdate: {
      title: 'Please update the app to newest version!',
      message:
        'This version of the app is no longer supported, please update to the newest version.',
      action: 'Go to download',
      actionAlt: 'Help',
    },
  },
  myList: {
    common: {
      episodes: 'Episodes',
    },
    download: {
      notFound: 'No downloaded series found'
    }
  },
};
