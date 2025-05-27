class SidebarMenuPage {
  get sidebar() {
    return cy.get('[class="bm-item-list"]');
  }
  get sidebarAllElements() {
    return cy.get('[class="bm-item menu-item"]');
  }
  get sidebarCloseButton() {
    return cy.get(".bm-cross-button");
  }
  get allItemsLink() {
    return cy.get("#inventory_sidebar_link");
  }
  get aboutLink() {
    return cy.get("#about_sidebar_link");
  }
  get logoutLink() {
    return cy.get("#logout_sidebar_link");
  }
  get resetLink() {
    return cy.get("#reset_sidebar_link");
  }

  verifySidebarIsVisible() {
    this.sidebar.should("be.visible");
  }
  verifyAllSidebarMenuOptionsAreVisible() {
    const expectedOptions = ["All Items", "About", "Logout", "Reset App State"];
    this.sidebarAllElements.then(($allOptions) => {
      const actualOptions = [...$allOptions].map((option) =>
        option.innerText.trim()
      );
      expect(actualOptions).to.deep.equal(expectedOptions);
    });
  }
  verifySidebarClosed() {
    this.sidebar.should("not.be.visible");
  }
  clickAllItemsLink() {
    this.allItemsLink.click();
  }

  verifyAboutLinkUrlIsCorrect() {
    this.aboutLink
      .should("be.visible")
      .invoke("attr", "href")
      .should("equal", "https://saucelabs.com/");
  }

  verifyAboutLinkIsReachable() {
    this.aboutLink
      .should("be.visible")
      .invoke("attr", "href")
      .then((href) => {
        expect(href).to.not.be.empty;
        cy.request(href).its("status").should("eq", 200);
      });
  }
  clickSidebarCloseButton() {
    this.sidebarCloseButton.click();
  }
  clickLogoutLink() {
    this.logoutLink.click();
  }
  clickResetLink() {
    this.resetLink.click();
  }
}
export default new SidebarMenuPage();
