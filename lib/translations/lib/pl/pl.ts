import { plSettings } from './categories';
import { notifications } from './notifications';

export const pl = {
  notifications,
  ...plSettings,
  routes: {
    Browse: 'Przeglądaj',
    BrowseStack: 'Przeglądaj',
    Episodes: 'Epizody',
    Login: 'Zaloguj się',
    SignUp: 'Zarejestruj się',
    ForgotPassword: 'Nie pamiętam hasła',
    Search: 'Wyszukaj',
    SearchStack: 'Wyszukaj',
    Settings: 'Ustawienia',
    SettingsStack: 'Ustawienia',
    SettingsAction: 'Edycja ustawienia',
    ActionConfirm: 'Potwierdź Akcję',
    SearchResults: 'Wyniki wyszukiwania',
    MyListStack: 'Moja lista',
    OfflineStack: 'Pobrane',
    WatchList: 'Lista oglądania (Beta)',
    HomeStack: 'Główna',
    Home: 'Główna',
  },
  forms: {
    save: 'Zapisz',
    continue: 'Kontynuuj',
    fields: {
      displayName: 'Nazwa użytkownika',
      email: 'Email',
      NickChange: 'Nazwa użytkownika',
      EmailChange: 'example@example.com',
      PasswordChange: '*************',
      ShindenIdChange: 'Shinden ID',
    },
    labels: {
      password: 'Hasło',
      NickChange: 'Nazwa użytkownika',
      EmailChange: 'Email',
      PasswordChange: 'Hasło',
      ShindenIdChange: 'Shinden ID',
      new: {
        NickChange: 'Nowa nazwa użytkownika',
        EmailChange: 'Nowy email',
        PasswordChange: 'Nowe hasło',
        ShindenIdChange: 'Nowe Shinden ID',
      },
    },
  },
  actions: {
    AccountDelete: {
      action_name: 'Usuwanie konta',
      message:
        'Jeżeli zostaniesz wylogowany, spróbuj zalogować się ponownie. Jeżeli akcja się nie powiedzie, spróbuj ponownie',
      confirm: 'Chcę usunąć swoje konto',
    },
  },
  text: {
    hello: 'Witaj',
  },
  buttons: {
    go_back: 'Powrót',
    reload: 'Odśwież',
    support: 'Wsparcie',
    delete: 'Usuń',
  },
  auth: {
    login: 'Zaloguj się',
    register: 'Zarejestruj się',
    forgot_password: 'Nie pamiętasz hasła?',
    password: 'Hasło',
    password_again: 'Hasło ponownie',
    new_user: 'New user? Join here',
    logout: 'Wyloguj',
    username: 'Nazwa użytkownika',
    email_verify: {
      top: 'Zweryfikuj swój adres email',
      bottom: 'i zaloguj się ponownie',
    },
    required_field: 'To pole jest wymagane',
    email_sent: 'Wyślij email',
    email_has_been_sent: 'Email został wysłany',
    errors: {
      invalid_email: 'Email jest niepoprawny',
      user_not_found:
        'Użytkownik nie został znaleziony lub hasło jest niepoprawne',
      unknown: 'Wystąpił nieznany błąd, skontaktuj się ze wsparciem',
      email_already_in_use: 'Ten użytkownik już istnieje',
      passwords_do_not_match: 'Hasła nie są takie same',
      weak_password: 'Hasło powinno mieć co najmniej 6 znaków',
      wrong_password: 'Hasło lub email jest nieprawidłowe',
    },
    continue_with: 'Kontynuuj z',
    delete_account: 'Usuń konto',
  },
  welcomeScreen: {
    welcome: 'Witaj w',
    cto: 'Zaczynamy',
    apiLoading: 'Proszę czekać, nasze serwery rozgrzewają się',
    apiError: 'Wystąpiłem problem z serwerami',
    apiContact: 'Kliknij tutaj, aby się z nami skontaktować',
  },
  animeSeason: {
    winter: 'Zima',
    spring: 'Wiosna',
    summer: 'Lato',
    fall: 'Jesień',
    WINTER: 'Zima',
    SPRING: 'Wiosna',
    SUMMER: 'Lato',
    FALL: 'Jesień',
  },
  anime_details: {
    see_episodes: 'Zobacz epizody',
    next_episode: 'Następny odcinek',
    format: 'Format',
    episodes: 'Epizody',
    duration: 'Długość',
    status: 'Status',
    status_list: {
      FINISHED: 'Zakończona',
      RELEASING: 'Emitowane',
      NOT_YET_RELEASED: 'Zapowiedź',
      CANCELED: 'Anulowana',
      HIATUS: 'Wstrzymana',
      UNKNOWN: 'Nieznany',
      ONGOING: 'Emitowane',
      UPCOMING: 'Zapowiedź',
    },
    score: 'Ranking',
    season: 'Sezon',
    relations: 'Relacje',
    relations_list: {
      ADAPTATION: 'Adaptacja',
      PREQUEL: 'Prequel',
      SEQUEL: 'Sequel',
      PARENT: 'Rodzic',
      SIDE_STORY: 'Historia poboczna',
      CHARACTER: 'Wspólna postać',
      SUMMARY: 'Podsumowanie',
      ALTERNATIVE: 'Historia alternatywna',
      SPIN_OFF: 'Spin off',
      OTHER: 'Inne',
      SOURCE: 'Źródło',
      COMPILATION: 'Kompilacja',
      CONTAINS: 'Zawiera',
      NOT_YET_RELEASED: 'Zapowiedź',
    },
    trailer: 'Zwiastun',
    links: 'Linki',
    source: 'Źródło',
    averageScore: 'Średnia ocena',
  },
  watch_list: {
    watching: 'Oglądam',
    add: 'Dodaj do listy',
    finished: 'Obejrzane',
    remove: 'Usuń z listy',
    Planning: 'Planuję',
    Watching: 'Oglądam',
    Completed: 'Obejrzane',
    OnHold: 'Wstrzymane',
    Dropped: 'Porzucone',
  },
  anime_episodes: {
    players_not_found: 'Nie znaleziono odtwarzaczy',
    Episode: 'Odcinek',
    available_players: 'Dostępne odtwarzacze',
    load_players: 'Załaduj odtwarzacze',
    disclaimer:
      'AniWatch nie hostuje żadnych plików na własnych serwerach, udostępniamy jedynie linki do treści hostowanych na serwerach stron trzecich.',
    load_players_error: 'Nie udało się załadować odtwarzaczy',
    load_players_empty: 'Nie znaleziono odtwarzaczy',
    watch_list: {
      add: 'Oznacz jako obejrzane',
      remove: 'Usuń z obejrzanych',
    },
    upcoming: 'Nadchodzący',
  },
  important: {
    requireAppUpdate: {
      title: 'Wymagana aktualizacja',
      message:
        'Ta wersja aplikacji nie jest już wspierana. Wymagana aktualizacja, aby kontynuować korzystanie z AniWatch.',
      action: 'Zaktualizuj',
      actionAlt: 'Pomoc',
    },
  },
  myList: {
    common: {
      episodes: 'Epizody',
      watched: 'Obejrzane',
    },
    download: {
      notFound: 'Nie znaleziono pobranych serii',
    },
  },
  errors: {
    error_occurred:
      'Wystąpił błąd.\n Spróbuj ponownie później lub skontaktuj się z pomocą techniczną.',
  },
  ago: 'temu',
  home: {
    headers: {
      continueWatching: 'Kontynuuj Oglądanie',
      mostPopular: 'Najpopularniejsze W Tym Sezonie',
    },
    emptyState: {
      continueWatching: 'Zacznij oglądać, a to co oglądasz pojawi się tutaj',
      mostPopular: 'Brak danych',
    },
  },
};
