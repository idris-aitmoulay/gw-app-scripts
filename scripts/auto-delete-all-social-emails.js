const LINKED_IN_EMAILS = [ // all LinkedIn receiving emails
    'invitations@linkedin.com',
    'jobs-listings@linkedin.com',
    'messages-noreply@linkedin.com',
    'jobalerts-noreply@linkedin.com',
    'newsletters-noreply@linkedin.com',
    'messaging-digest-noreply@linkedin.com'
]

const APP_SCRIPT_NOTIFICATION_EMAIL = 'noreply-apps-scripts-notifications@google.com'; // app script notification

const ALL_BLACKLIST_SOURCE_EMAILS = [
    ...LINKED_IN_EMAILS,
    APP_SCRIPT_NOTIFICATION_EMAIL,
]

const MATCH_MULTIPLE_FORM_TERM = ALL_BLACKLIST_SOURCE_EMAILS.map(fromEmail => `from:${fromEmail}`).join(' OR ');

// See https://support.google.com/mail/answer/7190?hl=en
const SOCIAL_CRITERION = 'category:social';

const SOCIAL_EMAILS_PAGE_SIZE = 500; // for pagination

const FINAL_SOCIAL_QUERY = `${SOCIAL_CRITERION} AND (${MATCH_MULTIPLE_FORM_TERM}) AND older_than:5m`;

function deleteAllReceivedEmailFromBlackListedEmails() {
    const threads = GmailApp.search(FINAL_SOCIAL_QUERY,0, SOCIAL_EMAILS_PAGE_SIZE);
    for (let i = 0; i < threads.length; i++) {
        const thread = threads[i];
        Logger.log(thread.getFirstMessageSubject())
        threads[i].moveToTrash();
    }
}

