class FooterClass {
  get footerCopyRightText() {
    return cy.get('[class="footer_copy"]');
  }
  get robotImage() {
    return cy.get('[class="footer_robot"]');
  }
  get twitterImage() {
    return cy.get(".social_twitter");
  }
  get facebookImage() {
    return cy.get(".social_facebook");
  }
  get linkedinImage() {
    return cy.get(".social_linkedin");
  }

  veryFooterSocialSitesImagesAreVisible() {
    this.twitterImage.should("be.visible");
    this.facebookImage.should("be.visible");
    this.linkedinImage.should("be.visible");
  }
  verifyFooterCopyRightTextIsVisible() {
    this.footerCopyRightText.should(
      "contain.text",
      "© 2020 Sauce Labs. All Rights Reserved."
    );
  }
  verifyFooterRobotImageIsVisible() {
    this.robotImage
      .should("be.visible")
      .and("have.attr", "src")
      .and(
        "include",
        "img/SwagBot_Footer_graphic.png");
  }
}
export default new FooterClass();
