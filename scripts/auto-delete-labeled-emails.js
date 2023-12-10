var LABEL_TO_DELETE = 'TO_BE_DELETED';
var DELETE_AFTER_DAYS = "2";
var TIMEZONE = "CET";
var PAGE_SIZE = 150;

function assertThatLabelExist() {
    const labels = GmailApp.getUserLabels();
    const foundedLabels = labels.filter(label => label.getName() === LABEL_TO_DELETE);
    if (foundedLabels.length <= 0) {
        Logger.log('Would you like to create '+ LABEL_TO_DELETE);
        throw Error(`${LABEL_TO_DELETE} label not found`);
    }
    Logger.log(`${foundedLabels[0].getName()} label not found`);
}

function moveToTrashLabeledEmailsAsToBeDeletedEmails() {
    assertThatLabelExist();
    const age = new Date();
    age.setDate(age.getDate() - DELETE_AFTER_DAYS);
    const purge  = Utilities.formatDate(age, TIMEZONE, "yyyy-MM-dd");
    const searchCriterion = `label:${LABEL_TO_DELETE} AND before: ${purge}`;
    Logger.log(searchCriterion);
    const threads = GmailApp.search(searchCriterion, 0, PAGE_SIZE);
    Logger.log(threads.length)
    for (var i=0; i<threads.length; i++) {
        var thread = threads[i];
        Logger.log(thread.getFirstMessageSubject())
        thread.moveToTrash();
    }
}
