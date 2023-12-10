
const OLD_EMAILS_ON_PROMOSTIONS_CATEGORY = 'category:promotions older_than:4m';
const PORMOTION_EMAILS_PAGE_SIZE = 500; // for pagination
function deleteOldCategory() {
    const threads = GmailApp.search(OLD_EMAILS_ON_PROMOSTIONS_CATEGORY,0, PORMOTION_EMAILS_PAGE_SIZE);
    for (let i = 0; i < threads.length; i++) {
        const thread = threads[i];
        Logger.log(thread.getFirstMessageSubject())
        threads[i].moveToTrash();
    }
}
