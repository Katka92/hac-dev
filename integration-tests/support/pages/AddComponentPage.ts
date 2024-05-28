import { Common } from '../../utils/Common';
import { pageTitles } from '../constants/PageTitle';
import { addComponentPagePO, createApplicationPagePO } from '../pageObjects/createApplication-po';
import { AbstractWizardPage } from './AbstractWizardPage';

export class AddComponentPage extends AbstractWizardPage {
  waitUnableToAccess(timeoutDuration: number = 90000) {
    cy.contains('div', addComponentPagePO.notValidatedMessage, { timeout: timeoutDuration });
  }
  waitRepoValidated(timeoutDuration: number = 140000) {
    cy.get(addComponentPagePO.enterSource).its('aria-invalid').should('be', 'false');
  }

  openSamplesPage() {
    cy.contains(addComponentPagePO.samples).click();
    Common.waitForLoad();
    cy.testA11y(`${pageTitles.sampleStart} page`);
  }

  setSource(source: string) {
    cy.get(addComponentPagePO.enterSource).clear().type(source);
  }

  setGitReference(gitReference: string) {
    cy.get(addComponentPagePO.gitReference).clear().type(gitReference);
  }

  setContextDir(contextDir: string) {
    cy.get(addComponentPagePO.contextDir).clear().type(contextDir);
  }

  submit() {
    cy.contains('button', 'Import code').should('be.enabled').invoke('click');
  }

  clickCancel() {
    cy.get(addComponentPagePO.cancel).trigger('click');
  }

  loginByToken(username: string, token: string) {
    cy.contains('button', addComponentPagePO.useTokenButton, { timeout: 120000 }).click();
    cy.get(addComponentPagePO.username).type(username);
    cy.get(addComponentPagePO.token).type(token, { log: false });
    cy.wait(2000);
    cy.get(addComponentPagePO.authenticateButton).click();
  }
}
