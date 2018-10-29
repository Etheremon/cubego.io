import React from 'react';

import {connect} from "react-redux";
import {getTranslate} from 'react-localize-redux';

import withRouter from "react-router-dom/es/withRouter";

import Navbar from '../../components/bars/Navbar/Navbar.jsx'
import Footer from '../../components/bars/Footer/Footer.jsx'
import { Container } from '../../widgets/Container/Container.jsx';
import { PageWrapper } from '../../widgets/PageWrapper/PageWrapper.jsx';

require("style-loader!./TosPage.scss");

class TosPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };

    this.validateEmail = this.validateEmail.bind(this);
  }

  componentDidMount() {

  }


  render() {
    return (
      <PageWrapper>
        <Navbar size={Container.sizes.SMALL}/>

        <Container className={'tos-page'} size={Container.sizes.TEXT}>

          <h1>TERMS OF SALE AND USE</h1>

          <h2>
          Summary and introduction
          </h2>

          <p>Please read these terms of sale and use (defined below as “Terms”) relating to the game component known as “Cubego” (as further defined below) carefully. The Cubego will be provided by Astrona Pte. Ltd. which is the “Business” as defined below. If you do not agree to these terms of sale, do not purchase, create or collect the Cubego or use the Cubego platform. The Business shall not assume any liability for anything contained in this document.
          By accessing and using the information contained on the Website of the Business located at https://www.cubego.io (“Website”) or by purchasing, creating or collecting the Cubego offered on the Cubego Platform, you acknowledge that you have read these Terms and that you agree to be bounded by them. If you do not agree to all of the terms and conditions as stated herein, you are not considered a true Cubego Player (or an authorised holder) of the Cubego or an user of the Website or the Cubego platform, and you should not purchase, collect the Cubego, create any characters from the Cubegoes or use the Website or the Cubego Platform.
          The Business reserves the right to change, modify, add or remove any of these Terms at any time for any reason. We suggest that you review these terms periodically for changes. Such changes shall be effective immediately upon posting on the Website. You acknowledge that by accessing Website or the Cubego platform after we have posted changes to these terms, you are agreeing to such modified terms.
          The purchase, creating and collecting of the Cubego on the Cubego platform shall not be construed as investment or financial contribution or any form of financial assistance and does not present an exchange of the Cubego for any form of investment returns or profits. The sale of the Cubego to you is intended for your own entertainment and play. Holders of the Cubego are only entitled to the use of the Website, and certain services within the Cubego platform in accordance with the Terms set out herein. you are not to sell or use the Cubego outside the Cubego platform.
          The Business expressly disclaims any and all responsibility for any direct or consequential loss or damage of any kind whatsoever arising directly or indirectly from: (i) reliance on any information contained in this document, (ii) any error, omission or inaccuracy in any such information or (iii) any action resulting therefrom, (iv) the purchase, create, collection or resale of the Cubego.
          </p>

          <h3>1. DEFINITIONS</h3>
          <p>The following terms shall, for the purpose of these Terms, have the following meaning:</p>
          <ul>
          <li>"Applicable Law" means the laws and regulations of the Republic of Singapore.</li>
          <li>“Business” or “We” or Our” means or refers to Astrona Pte. Ltd., which is registered under the laws of Singapore.</li>
          <li>“Cryptocurrency(ies)” means a digital currency, in which encryption techniques are used to regulate the generation of units of the currency and to verify the transfer of the currency and which operates independently of the central bank of a country. Such digital currency is not legal tender issued by any central bank nor does it confer any interest in the ownership of, or debt relating to, any asset or property.</li>
          <li>“Cubego” or “Cubegoes” means the virtual materials in the form of cube and everything created from these cube materials which are issued and offered for sale by the Business to the Cubego Holder subject to the terms and conditions set out in clause 3 of these Terms.</li>
          <li>“Cubego Platform” means the platform developed, owned, operated and deployed by the Business for providing the Services set out in clause 2 of these Terms.</li>
          <li>“Services” shall have the meaning given to the term under clause 2.1. of these Terms.</li>
          <li>“Terms” means these Terms of sale for the sale and purchase of Cubego, and the use of Cubego on the Cubego Platform or in any other manner approved by the Business, the use of the Website and the use of the Cubego Platform.</li>
          <li>“You” or “your” or “Cubego Player” or “Cubego Holder” means and shall refer to any person or entity (whether incorporated or not) who purchases, creates or collects the Cubego.</li>
          </ul>

          <h3>2. DESCRIPTION OF THE CUBEGO PLATFORM</h3>
          <p>2.1. The Cubego Platform provides an online simulation game ecosystem for Cubego Player to create/buy Cubego which will then be used to build characters/items and other virtual in-game assets and commanded by such Cubego Player. During the Cubego’ life, the Cubego is used to build characters, which are also called Cubegon in-game. These Cubegons can grow stronger as Cubego Player use them in Cubego game. You can buy/collect/create Cubegoes and Cubegons, undertake adventures with them by participating in battles or trade them with your fellow Cubego Players. The Cubego Platform permits you to create and trade virtual items, but not limited to the Cubego during gameplay (the “Services”).</p>
          <p>2.2. The Cubego Platform is powered by the underlying Ethereum blockchain network with integrated smart contract functionalities which enables direct and transparent transactions to occur. The Cubego Platform is our blockchain infrastructure solution to the common trust issues with the centralised systems by utilising the decentralised systems created by the multiple stakeholders in the Ethereum code-base network.</p>
          <p>2.3. Ethereum (“ETH”) and EMONT are used as the designated forms of in-game currency to purchase products and services within the Cubego Platform. An EMONT is an ERC-20 token and is used as one of the designated forms of in-game currency to purchase Cubego, products and services within the Cubego Platform. At the moment, Cubego Players are prohibited from purchasing EMONT using ETH and selling EMONT for ETH or fiat-currency on the Cubego Platform.</p>

          <h3>3. THE SALE OF CUBEGO</h3>
          <p>3.1. The Terms in this clause 3 describe and govern certain aspects of the sale and purchase of Cubego on the Cubego Platform, in addition to and without prejudice to all other clauses of these Terms.</p>
          <p>3.2. Cubego Holders, upon purchase, create or collecting of such Cubego will be able to access and utilise the Services through the Cubego Platform.</p>
          <p>3.3. Other than the rights to access the Cubego Platform to use the Services as set out in clause 2 above, Cubego Players shall not have any other rights on the Cubego Platform and the Cubego as they are virtual game characters on the Ethereum code-base blockchain. Cubego Players may be eligible to receive rewards (in the form of ETH and EMONT from the Business’ wallet, or other in-game products and services, or additional Cubego) for their active participation on the Cubego Platform. These rewards may be distributed from time to time at our sole and absolute discretion, as a form of incentive for “early-bird” purchasers of new Cubego characters, or supporters of our activities, as the Cubego Platform continues to grow through increased participation of all Cubego Players and parties. The Business can cease to give rewards at any time at our sole and absolute discretion, or choose to issue rewards to some and not all Cubego Players or Cubego Holders.</p>
          <p>3.4. No promises of future performance or value are or will be made in respect to the Cubego, including no promise of inherent value, no promise of continuing payments, and no guarantee that the Cubego will hold any particular value. you purchase, create and collect the Cubego on the Cubego Platform for your personal entertainment, play or leisure.</p>
          <p>3.5. The Cubego are not intended to be used in any platforms other than the Cubego Platform, and the Business will not be responsible if you use or attempt to use the Cubego in any platform other than the Cubego Platform or for any purpose other than for which the Cubego are designed.</p>

          <h3>4. USE OF THE WEBSITE AND CUBEGO PLATFORM</h3>
          <p>4.1. These Terms apply to all users of the Website and the Services on the Cubego Platform. By using the Website in any manner, including but not limited to visiting or browsing the Website, you agree to observe and be bound by these Terms and the additional terms and conditions and policies referenced in these Terms, or available by hyperlink on the Website.</p>
          <p>4.2. The Website or the Ethereum Platform may allow Cubego Players to enable trading of Cubego or other tradable items with other Cubego Players and you may be charged a trading fee for such transaction. you acknowledge that your decision to enter into any trade of Cubego or other tradable items is at your sole discretion and your own risk. The Business only provides an online facility for Cubego Players to exchange Cubego or any tradeable items for Cubego or ETH. We do not screen trading partners and we make no guarantee that a trade will be satisfactory or that trades will be a fair exchange of value between the parties to that trade. We reserve the right to determine in our sole discretion, with or without notice, what and when Cubego or other tradable items may be traded between and among Cubego Players. Non-tradable items cannot be traded under any circumstances.</p>
          <p>4.3. Any attempt to trade, exchange or otherwise give away the Cubego outside the Cubego Platform, or other than by using the Services provided through the Cubego Platform to trade a prohibited item, or to make an offer to trade items where the trade is contingent upon an event (e.g. the outcome of a battle) is strictly prohibited under these Terms. you can only obtain Cubego or tradable items from the Business, or other Cubego Players, and through means provided by Us, and not from or through any third-party platform, exchange, broker, or other mechanism, unless expressly authorised. For the avoidance of doubt, as stated in the Cubego Platform contemplates doing battle with Cubego and trading them with fellow Cubego Players (in the course of doing battle or otherwise.</p>
          <p>4.4. Subject to your compliance with these Terms, we grant you a limited, non-exclusive, revocable (with or without cause), non-transferable right and license to use the Services. you shall use the Services in accordance with these Terms and shall not:</p>

          <ul>
          <li>(a) Copy, decompile, reverse engineer, disassemble, attempt to derive the source code of, decrypt, interfere with, or disrupt the integrity or the performance of the Services.</li>
          <li>(b) Make any modification, adaptation, improvement, enhancement, translation or derivative work from the Services.</li>
          <li>(c) Violate any applicable laws, rules or regulations in connection with your access or use of the Services.</li>
          <li>(d) Use the Services in violation of or to circumvent any sanctions or embargo.</li>
          <li>(e) Use the Services for any purpose for which it is not designed or intended.</li>
          <li>(f) Use the Services to create or promote a product, service or software that is, directly or indirectly, competitive with or in any way a substitute for the Service or any services, product or platform offered by the Business.</li>
          <li>(g) Use any of our proprietary information or interfaces or any other intellectual property in the design, development, manufacture, licensing or distribution of any application, accessories or devices for use with the Services.</li>
          <li>(h) Use the Services to send, post, or otherwise communicate any content which is offensive, indecent, threatening, abusive, insulting, harassing, defamatory, libellous, deceptive, fraudulent, tortious, obscene, profane, invasive of another person’s privacy, or racially, ethnically or otherwise objectionable.</li>
          <li>(i) Use the Services to send automated, unsolicited or unauthorised messages, advertising or promotional material or any junk mail, spam or chain letters.</li>
          <li>(j) Upload to, or transmit through the Services any data, file, software or link that contains or redirects to a virus, Trojan horse, worm or other harmful components.</li>
          <li>(k) Use any scraper, robot, bot, spider, crawler or any other automated device or means to access, acquire, copy or monitor any portion of the Services, or any data or content found or access through the Services.</li>
          <li>(l) Collect any information in respect of other users without their consent.</li>
          <li>(m) Commit any act to avoid paying any applicable fees or charges.</li>
          <li>(n) Authorise or encourage anyone to do any of the foregoing.</li>
          </ul>

          <h3>5. YOUR CHARACTER’S DESIGN</h3>

          <p>5.1. As a Cubego Player, you can design characters from Cubegoes and create them via Cubego’s smart contracts. You can also acquire characters from other Cubego Players. You understand that Cubego does not guarantee any confidentiality with respect to any character you create and/or own.</p>
          <p>5.2. You shall be solely responsible for your characters you create and/or own and the consequences of creating or acquiring characters on the Cubego Platform. You affirm, represent, and warrant that you own or have the necessary licenses, rights, consents, and permissions to create characters’ design on the Cubego Platform; and you license to Cubego all patent, trademark, trade secret, copyright or other proprietary rights in and to such design for publication on Cubego Platform pursuant to these Terms of Service. All of ownership rights of your characters you create and/or own on the Cubego Platform are retained under you.</p>
          <p>5.3. By creating characters on the Cubego Platform, you hereby grant Cubego a non-exclusive, royalty-free license to use, reproduce, distribute, prepare derivative works of, display your characters in connection with the (and its successors' and affiliates') Business, including without limitation for promoting and redistributing part or all of the Services (and derivative works thereof) in any media formats and through any media channels.</p>
          <p>5.4. You agree that the character’s design you create on the Cubego Platform does not contain third party copyrighted material, or material that is subject to other third party proprietary rights, unless you have permission from the rightful owner of the material or you are otherwise legally entitled to post the material and to grant Cubego all of the license rights granted herein.</p>
          <p>5.5. You agree that not to create any characters with names and/or designs that fall under one of the following categories:</p>
          <ul>
          <li>offending any individuals or organizations</li>
          <li>impersonating another individual or organization</li>
          <li>promoting violence acts</li>
          <li>discriminating against individuals or groups based on race or ethnic origin, religion, disability, gender, age, nationality, veteran status, or sexual orientation/gender identity</li>
          <li>containing sexual content</li>
          <li>revealing other people's personal information</li>
          <li>Cubego reserves the right to decide whether your characters’ name and design falls under one or several of the categories above and to remove and/or replace characters’ name and design on Cubego Platform without prior notice.</li>
          </ul>
          <p>5.6. Cubego does not endorse any design of character created in the Cubego Platform by any user, and Cubego expressly disclaims any and all liability in connection with character’s design created by Cubego Players. Cubego does not permit copyright infringing activities and infringement of intellectual property rights on the Cubego Platform, and Cubego will remove all characters’ designs if properly notified or reported that such designs infringe on another's intellectual property rights. Cubego reserves the right to remove and/or replace characters’ design on Cubego Platform without prior notice.</p>

          <h3>6. SOURCE OF FUNDS</h3>
          <p>You agree, represent, and warrant that all ETH in your wallet, vault or other storage mechanisms you use for purposes of purchasing, capturing, collecting, exchanging or trading the Cubego now, or in the future on the Website, are not the direct or indirect proceeds of any criminal or fraudulent activity.</p>

          <h3>7. SECURITY</h3>
          <p>7.1. You are responsible for implementing reasonable measures for securing the wallet, vault or other storage mechanism you use to purchase, capture or collect the Cubego on the Cubego Platform, including any requisite private key(s) or other credentials necessary to access such storage mechanism(s). If your private key(s) or other access credentials are lost, you may lose access to your Cubego. The Business is not and shall not be responsible for any such losses.</p>

          <h3>8. PERSONAL INFORMATION</h3>
          <p>8.1. The Business may be required, from time to time, to obtain certain information about you (“User Information”) in order to complete the purchase, capture and collection of the Cubego. If the Business so requires, and you do not provide the information, then we may be unable to complete the purchase, capturing, collection; or deliver the Cubego to you.</p>
            <p>8.2. If the User Information is so required, it is important that you provide accurate, complete, and up-to-date information, and you agree to update such information as needed, to keep it accurate, complete, and up-to-date.</p>

          <h3>9. REPRESENTATIONS AND WARRANTIES</h3>
          <p>9.1. By purchasing, capturing, collecting the Cubego and using the Cubego Platform, you represent and warrant that:</p>
          <ul>
          <li>(a) you have sufficient understanding of and experience with cryptographic tokens (in particular ETH), token storage mechanisms (such as token wallets), and blockchain technology to understand these Terms and to understand the Risks and implications of purchasing, capturing and collecting the Cubego using ETH;</li>
          <li>(b) you have read and understand these Terms (including all Annexures);</li>
          <li>(c) you have obtained sufficient information about the Business, and the Cubego to make an informed decision to purchase, capture and collect the Cubego;</li>
          <li>(d) you are not purchasing, capturing or collecting the Cubego for any uses or purposes other than to participate in the Cubego Platform and subsequent game features on the Website.</li>
          <li>(e) your purchase, capture and collection of the Cubego comply with applicable law and regulation in your jurisdiction, including, but not limited to, (i) legal capacity and any other threshold requirements in your jurisdiction for use and payment of ETH, and entering into contracts with the Business, (ii) any foreign exchange or regulatory restrictions applicable to such purchase, and (iii) any governmental or other consents that may need to be obtained;</li>
          <li>(f) you will comply with any applicable tax obligations in your jurisdiction arising from your purchase, capture and collection of the Cubego if required; and</li>
          <li>(g) If you are purchasing, capturing or collecting the Cubego on behalf of any individual or entity, you are authorised to accept these Terms on such individual’s or entity’s behalf and that such individual or entity will be responsible for breach of these Terms by you or such individual or any other employee or agent of such entity.</li>
          </ul>

          <h3>10. INDEMNIFICATION</h3>
          <p>10.1. To the fullest extent permitted by Applicable Law, you will indemnify, defend and hold harmless the Business and the Business’ past, present and future employees, partners, , contractors, consultants, suppliers, vendors, service providers, agents, representatives, predecessors, successors and assigns (the “Indemnified Parties”) from and against all claims, demands, actions, damages, losses, costs and expenses (including attorneys’ fees) that arise from or relate to: (i) your purchase, capture or collecting of the Cubego, (ii) your responsibilities or obligations under these Terms, (iii) your violation of these Terms, or (iv) your violation of any rights of any other person or entity.</p>
          <p>10.2. The Business reserves the right to exercise sole control over the defense, at your expense, of any claim subject to indemnification. This indemnity is in addition to, and not in lieu of, any other indemnities set forth in a written agreement between you and the Business.</p>

          <h3>11. DISCLAIMERS</h3>
          <p>11.1. To the fullest extent permitted by applicable law and except as otherwise specified in a writing by the company, (i) the Cubego are offered and sold on an “as is” and “as available” basis without warranties of any kind, and the Business expressly disclaims all implied warranties as to the Cubego, including, without limitation, implied warranties of merchantability, fitness for a particular purpose, title and non-infringement; (ii) the Business does not represent or warrant that the Cubego are reliable, current or error-free, meet your requirements, or that defects in the Cubego will be corrected; (iii) the Business cannot and does not represent or warrant that the Cubego or the delivery mechanism for the Cubego are free of viruses or other harmful components; and (iv) the Cubego Platform is a decentralized application built on the Ethereum network, and thus, the Cubego Platform does not guarantee any purchase, capture, collection and delivery of the Cubego and the Business shall not be responsible for any faulty transactions or incorrect prices that may occur on the Website.</p>
          <p>11.2. Some jurisdictions do not allow the exclusion of certain warranties or disclaimer of implied terms in contracts with consumers, so some or all of the exclusions of warranties and disclaimers in this clause may not apply to you.</p>

          <h3>12. LIMITATION OF LIABILITY</h3>
          <p>12.1. To the fullest extent permitted by Applicable Law: (i) in no event will the Business or any of the Indemnified Parties be liable for any indirect, special, incidental, consequential, or exemplary damages of any kind (including, but not limited to, where related to loss of revenue, income or profits, loss of use or data, or damages for business interruption) arising out of or in any way related to the sale, capture or collecting of the Cubego or due to loss of any private keys or loss of passwords in relation to the Cubego or the Cubego Platform or otherwise related to these Terms, now or in the future, regardless of the form of action, whether based in contract, tort (including, but not limited to, simple negligence, whether active, passive or imputed), or any other legal or equitable theory (even if the party has been advised of the possibility of such damages and regardless of whether such damages were foreseeable); and (ii) in no event will the aggregate liability of company and the indemnified parties (jointly), whether in contract, warranty, tort (including negligence, whether active, passive or imputed), or other theory, arising out of or relating to these Terms or the use of or inability to use the Cubego, exceed the amount you pay to the Business for the Cubego.</p>
          <p>12.2. The limitations set forth in clause 11.1 will not limit or exclude liability for the gross negligence, fraud or intentional, willful or reckless misconduct of the Business. Some jurisdictions do not allow the limitation or exclusion of liability for incidental or consequential damages. Accordingly, some of the limitations of this clause may not apply to you.</p>
          <p>12.3. The Business shall not be liable for failure to perform due to force majeure events including, but not limited to, unavoidable casualty, delays in delivery of materials, embargoes, government orders, acts of civil or military authorities, acts by common carriers, emergency conditions (including weather conditions), or any similar unforeseen event that renders performance commercially implausible.</p>

          <h3>13. RELEASE</h3>
          <p>13.1. To the fullest extent permitted by Applicable Law, you release the Business and the other Indemnified Parties from responsibility, liability, claims, demands and/or damages (actual and consequential) of every kind and nature, known and unknown (including, but not limited to, claims of negligence), arising out of or related to disputes between users and the acts or omissions of third parties.</p>

          <h3>14. GOVERNING LAW AND JURISDICTION</h3>
          <p>14.1. These Terms and all subsequent variations of or amendments to these Terms shall be subject to, governed by and interpreted in accordance with the laws of Singapore for every purpose, without regard to any conflict of law provisions.</p>
          <p>14.2. You agree to be subject to and submit to the jurisdiction of the courts in Singapore.</p>

          <h3>15. MISCELLANEOUS</h3>
          <p>15.1. Severability: If any term, clause or provision of these Terms is held unlawful, void or unenforceable, then that term, clause or provision will be severable from these Terms and will not affect the validity or enforceability of any remaining part of that term, clause or provision, or any other term, clause or provision of these Terms.</p>
          <p>15.2. Entire Agreement: These Terms constitute the entire agreement between you and the Business relating to your purchase, capture and collecting of the Cubego from the Cubego Platform.</p>
          <p>15.3. Assignment: Except as otherwise provided in herein, these Terms are intended solely for the benefit of you and the Business and are not intended to confer third-party beneficiary rights upon any other person or entity. The Business may assign its rights and obligations under these Terms.</p>
          <p>15.4. Waiver: The failure of the Business to exercise or enforce any right or enforce strict compliance or provision of these Terms will not operate as a waiver of such right or provision. The Business will not be liable for any delay or failure to perform any obligation under these Terms where the delay or failure results from any cause beyond the Business’s reasonable control.</p>
          <p>15.5. No Partnership/ Joint Venture: The purchase, capture and collection of the Cubego from the Cubego Platform does not create any form of partnership, joint venture or any other similar relationship between you and the Business.</p>
          <p>15.6. Title and Subtitles: The titles and subtitles used in these Terms are used for convenient reference only and are not to be considered in construing or interpreting these Terms.</p>
          <p>15.7. Right to Amend: The Business may revise the Terms from time to time in any circumstances, including but not limited to:</p>
          <ul>
          <li>(a) changes in the type of cryptocurrency used for the purchase of Cubego;</li>
          <li>(b) changes in the value and features of the Cubego;</li>
          <li>(c) changes in the governing law and jurisdiction referred to in clause 13; and</li>
          <li>(d) any other changes that may be required from time to time following changes to business practices, industry developments, or new regulatory requirements.</li>
          <li>Any such amendments will be published on the Website.</li>
          </ul>
          <p>15.8. Third Party Websites Or Platforms: The Business may provide certain hyperlinks to third party websites, and the inclusion of any hyperlinks or any advertisement of any third party on the Platform does not imply endorsement by the Business of their websites, products or business practices. If you access and use any third-party websites, products, services, platforms and/or business, you do so solely at your own risk for which the Business will bear no liability.</p>
          <p>15.9. Intellectual Property Rights: The Terms shall not entitle you to any intellectual property rights, including the rights in relation to the use, for any purpose, of any information, image, user interface, logos, trademarks, trade names, Internet domain names or copyright in connection with the Website, the Cubego Platform, or the sale of the Cubego.</p>
          <p>15.10. Cubego Sale Jurisdiction: As the Cubego Platform is an online facility, and the Cubego are virtual -, the purchase and use of Cubego may take place worldwide and is not linked to any specific jurisdiction. In order to be eligible to participate, save as otherwise provided, you may be from any jurisdiction in the world, except for any jurisdiction where the cryptocurrency used for the purchase of Cubego may be classified or treated by any government, quasi-government, authority or public body as a kind of currency, securities, commercial paper, negotiable instrument, investment or where the cryptocurrency used for the purchase of Cubego may be banned, regulated or subject to certain legal restrictions.</p>
          <p>15.11. Third Party Rights: Unless expressly provided to the contrary in these Terms, a third party has no right under the Contracts (Rights of Third Parties) Act, Chapter 53B of Singapore to enforce or to enjoy the benefit of any term of these Terms. Notwithstanding any term of these Terms, the consent of any third party is not required for any variation (including any release or compromise of any liability under) or termination of these Terms.</p>


          <p>
            ***<br/>
            Please send any questions or requests in relation to the Policy to:
          </p>
          <h4>Email: contact@cubego.io</h4>
          <p>To facilitate any request in respect of your personal data, you should indicate “PDPA Request” in your email or other communication to us.</p>

        </Container>

        <Footer size={Container.sizes.SMALL}/>
      </PageWrapper>
    )
  }
}

const mapStateToProps = (store, props) => {
  let pathName = props.location.pathname;

  return {
    pathName,
    _t: getTranslate(store.localeReducer),
  }
};

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch,
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TosPage));
