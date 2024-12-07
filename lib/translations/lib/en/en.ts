import { enSettings } from './categories';
import { notifications } from './notifications';

export const en = {
  notifications,
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
    SettingsAction: 'Setting Edit',
    ActionConfirm: 'Confirm Action',
    SearchResults: 'Search Results',
    MyListStack: 'My List',
    OfflineStack: 'Offline',
    WatchList: 'Watch List (Beta)',
    HomeStack: 'Home',
    Home: 'Home',
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
      ShindenIdChange: 'Shinden ID',
    },
    labels: {
      password: 'Password',
      NickChange: 'Username',
      EmailChange: 'Email',
      PasswordChange: 'Password',
      ShindenIdChange: 'Shinden ID',
      new: {
        NickChange: 'New username',
        EmailChange: 'New email',
        PasswordChange: 'New password',
        ShindenIdChange: 'New Shinden ID',
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
    reload: 'Reload',
    support: 'Support',
    delete: 'Delete',
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
      wrong_password: 'Incorrect email or password',
    },
    continue_with: 'Continue with',
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
      UNKNOWN: 'Unknown',
      ONGOING: 'Releasing',
      UPCOMING: 'Announced',
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
      NOT_YET_RELEASED: 'Not yet released',
    },
    trailer: 'Trailer',
    links: 'Links',
    source: 'Source',
    averageScore: 'Average score',
  },
  watch_list: {
    watching: 'Watching',
    add: 'Add to list',
    finished: 'Watched',
    remove: 'Remove from list',
    Planning: 'Planning',
    Watching: 'Watching',
    Completed: 'Completed',
    OnHold: 'On Hold',
    Dropped: 'Dropped',
  },
  anime_episodes: {
    players_not_found: 'Players not found',
    Episode: 'Episode',
    available_players: 'Available players',
    load_players: 'Load players',
    disclaimer:
      'AniWatch does not host any files on its own servers, we only provide links to content hosted on third-party servers.',
    load_players_error: 'Error loading players',
    load_players_empty: 'No players found',
    watch_list: {
      add: 'Mark as watched',
      remove: 'Mark as unwatched',
    },
    upcoming: 'Upcoming',
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
      watched: 'Watched',
    },
    download: {
      notFound: 'No downloaded series found',
    },
  },
  errors: {
    error_occurred:
      'Something went wrong.\n Please try again later or contact support.',
  },
  ago: 'ago',
  home: {
    headers: {
      continueWatching: 'Continue Watching',
      mostPopular: 'Most Popular This Season',
    },
    emptyState: {
      continueWatching: 'Start watching to see it here',
      mostPopular: 'No data',
    },
  },
};
