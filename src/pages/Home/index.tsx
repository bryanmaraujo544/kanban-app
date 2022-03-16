/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import jwt_decode from 'jwt-decode';
import { AiOutlinePlus } from 'react-icons/ai';
import { GrFormClose } from 'react-icons/gr';

import { useNavigate } from 'react-router-dom';
import { BoardContextProvider } from '../../contexts/BoardContext';
import { Container, Header, SearchContainer } from './styles';
import { Board } from '../../components/Board';
import { Modal } from '../../components/Modal';

interface User {
  id: number;
  name: string;
  profileImageUrl: string;
}

const allUsers = [
  {
    name: 'Beatriz Ribon',
    email: 'beatrizribon3@gmail.com',
    image:
      'data:image/jpeg;base64,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',
  },
  {
    name: 'Henrique Ribon',
    email: 'henriqueribon3@gmail.com',
    image:
      'data:image/jpeg;base64,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',
  },
];

export const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [membersFound, setMembersFound] = useState([] as any);
  const [membersSelectedToInvite, setMembersSelectedToInvite] = useState(
    [] as any
  );
  const [memberEmail, setMemberEmail] = useState('');

  console.log(isLoading, membersFound);

  const cookies = parseCookies();
  const navigate = useNavigate();

  const user = jwt_decode(cookies.token) as User;

  useEffect(() => {
    if (!cookies.token) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const members = allUsers.filter((user) => user.email.includes(memberEmail));
    setMembersFound(members);
    setIsLoading(false);
  }, [memberEmail]);

  function handleSearchMember() {
    setIsModalOpen(true);
  }

  function handleAddMemberToSelectedList(user: any) {
    setMembersSelectedToInvite((prev: any) => [...prev, user]);
  }

  function handleRemoveMemberFromSelectedList(email: string) {
    setMembersSelectedToInvite((prev: any) =>
      prev.filter((prevMember: any) => prevMember.email !== email)
    );
  }

  function handleInviteMembers() {
    setIsModalOpen(false);
    setMembersSelectedToInvite([]);
    setMembersFound([]);
  }

  return (
    <BoardContextProvider>
      <Container>
        <Header>
          <div className="user-infos">
            <p>{user?.name}</p>
            <img src={user?.profileImageUrl} alt="user profile" />
          </div>
          <div className="right-actions">
            <div className="members">
              <img
                alt="member"
                src="https://avatars.githubusercontent.com/u/62571814?v=4"
              />
              <img
                alt="member"
                src="https://avatars.githubusercontent.com/u/62571814?v=4"
              />
              <img
                alt="member"
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBISEhISEhIYEhIYDxkfDxgYDx8JEhAZJSEnJyUhJCQpLjwzKSw4LSQkNDo0ODM1NzdOKDFVV0g1SjxCQzUBDAwMDw8PGRISGDEdGCsxMTQ/Pz8xPz8xPzsxNDE/MT80NDExMT80NDQ0NDE0NDE0Nj8/NDQ0MTExNDExND8/Mf/AABEIAMgAyAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAGAAIDBAUBBwj/xAA9EAABAwIEAwUFBgUDBQAAAAABAAIRAwQFEiExQVFxBiJhgZETobHB0SMyUmLh8AcUM0JyY4LxFTRzkrL/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQMCBAX/xAAhEQACAgMBAQEAAwEAAAAAAAAAAQIRAyExEkETUWFxIv/aAAwDAQACEQMRAD8AOxK4QVKGJPasGivCYQVMGrmVICCFxwUpauFqAIoXQ1PDU4NQBE1qrXNUyWMn8xn3Kxd1PZsLpg7N6oav8cp0QYBedgI7s+JKBmhcVG02hziD1dlErOrX4c0y9zDHdGTI0fv5oLxTtRUqOMnpGsdNFj18Xqu2cR0lqdCsmxTEHPrPcXGA4gayIChfdtIDRpp3jxJVBzXOMnUnc7SojTe0zGnROhFupcOnQkdHJ9OtUEOzO/8AYhVHPOUO48VxjSdS8j3pgGWDdqajMrKri5g+64k5meaOcPvg4AtdLTHHYrxth/NJ9ERdnsYNN2Rx7jtJ+7kP0WWho9UdUMb6qK6unNEteWmdw4sKrULsPYCdDEHiCp6+HVq4iiAcp70uydEqvQWUrjE62Uj2rjpx7ybbPc9ocSZI11WDc3RzmkQc+ctOhIkHXVEFnRcGAgGAN9kmgTJg47JriTt6rhE7pxWR2Jo21O/OUkhuOqSA2FLUnhdC49UMkMLkJ5XIQOyMhcITiEnBADITXvDQXOMAeSeTG6xsWuxTaXv1DRLRw8PVIDK7Q4qZaJyMALoO55E8hqvOcWxM1CWt0bPOZU3aHFjWqOIdLdnHbN+iwCSSmkBKHcgpWHlqVy2ozwlbljhZdHdRKSRqMHIxvYvP7ldFu8bg+iObXBmgahW/+ksjZT/Yv+DPOcmhEbqnUlu/A9Ef3WAidBCzMQwAQdFpZETlhkgObUPA6+isW9xzXL2xdTOo0UDiQAVTpFpp7PRuyuKZ2im495pGWeI/RetdlB9k93Evj0H6r5ww27LHNeDDmn1XpmC9pa1QZGPLGkyQ05JPOd1iT87NRj60jtajmq5g2e+4zHOUU0LuiyiGlrnvy7D7JrTz8T4qrbWkiSp3WZ4BReZ3o6FgX0zXlzjyHgkyjO+vvWoLIgJwoxwU3JspGCXEZwtojTiktMtABJ2G56JLNj8mqE16cFyou04CIhJdldaCgBiY5Pd++CYWoGQVTw2AEuK8y7c42S80WHQOOf6I9x+/FCjUqHg2QOZ2A9YXiN5WNR7nkkySSTqmkBWrP0SpMO3E78Vwau12Gq0MKt875O25nRDdIcVbNTCrA6E8kXYfQDY0WFQxalTIGUuHEzlRLh+JW9SMrwDyPcXNJSZ2Q8rVmjSywpBTCnbaggELhpluinRcrvoDkqNxayD/AMrZLTCp1nRKBMCcbw3QyOCCrijlJB5r1S/cHNcD9F57jVDK4kbFdGKXw5c0fqMek6CjPslU+0aPzAHhv+qDmt1BRL2fqZKlN3N0Hx4j3hUmrRDHqR7XQAa0cCSB9VaDAgrFcfYTTp06kkavcx2x5LZw6uXMbLiTzmVx1R6BvEBcdTHuVPKTxPqo33hZo/3apWFV9IcTjuUwY1Dn+AH1PwSWZWujmNR+kunXaBskjyxeo/yFkcVFWHlp1UgKjeu880a0JyYFIEAMUdQqZQ1EAee/xKvsradIHfvO+S82doCiPtze+0vKgGzTA6BDlTgEkMjpjTqiPBMKfVG+Vh3jQuWFbMktCObCs2nTaNjp4LE2/hXFFN7L1Hs7bAQWyeJJkqvddmmgg0nGPwk6joVIzFGk/eE9YV6lftnfXrKlckdPmD4Owq6qUQabySBtm72i36dwHiRvx8Fm+2a9usTzVi1gAwfmst2bjrReDZ3TKlu0jdQ17ghumpWNf3NUtcGlw724SURykkT4haiCZ+a8/wC0NGM3gtO6/nZ7heeJ5LDva1RwdTrAh5HdJbkVYxp3ZzzlaqjJYNvHzWzZNmnm4i4YAR0P1CyHGI5bN+ZWvgpzNYyJzXLD1gH6BUlwhDpsUsJrMe5uXQOMGYnkibAsXbT7lQwRoZ0IV2/ualNo9nQzOIGrtY8uPqqFpbvzGpUoh9QmXFwAb5AD6rnu+noVrSCj/qLC0FhkHbgsTFbh00zO74PopmvkDTLGhG+XwVPENXUR/q9OBVIwS2cc5ybpjsVt6lS2qspiahYMo3nUSB4xK6tOwaJOnALq2iQSKN6fKiqO1VDAk8FMTwgDhKz8VuxSpvqExlafgtEBA/8AErEPZ2/sxoXmOWn7CAPKbmualWpUPF/XionHXoExu46kldB7xQMv4ZTl4RVUtW1GAFsmOiw+z1HM8I6pWoyhQnKmdWKNxAa9wwsAytmHHMc0EhPsKdQBxzVBDhkBbOYeI4cEaPtAkyyHJL9NbH+W7RTw+o51OXAh3IiFtWLzGqrOYGhTWxO6m3ZaKG310WGQqj8XGgJ19FJiQJHmgq/sK85gS6CSeDo8AtRSfTM5OPEGQvGOGjh6ysfGabKtNxIGZo7p2goba6oGEtqOkEBrC3vnn0ViniRNNzXaP4yIW/DT0SeRNbRgXB2A2Gjeg/fvW52SpOfXpgf2hztdBtosGtuiHsk3vPPHKI57qsto54upWelVcVqNDfsQ+eT468FXvLwVgGZ6lIlwBYB7DNr+IfIhT2dN7SGZpMalw9pGn1VPEjeZg1rKDgXQJDievCPeoKLT4dbyxcatplq3tmU2FjG5RmcfxEmdyeJUFdsmn4P+RVtgOUZozZe9G0qGsNWf5/IqhyGjYDfqElJhze7P5kkwN4hQPGqn5qB41VSZ0FPCYE5AHXcua8f/AImXftLljJ0YzQdf0AK9ZuqmVjnTGhAPLxXhPa269pd1n/mgeWnySGjGp7z4LtPc9Um7Ep9syXRzICTGgm7Os73+yfeUb0WmAhHs/T1nw/fxRtbDQLlm9noYl/yM9kpMgG6sloAVW6PdMbrJSiG3sn136A5Z00W7RwwAARr6hD9/ci4tDasqG3qOgVDGUuA4A8itPsTY0bOk9gqFzdC7MdM3Ejr8k6E21xFi+wgFh5xohp9ttIW9bX13UxB4Ib/J5IYAAc2mrid5lRvotc5+XVuc5ePFHBV66DFxh7XagQfRDmNUMtM6Cc2hjVHle1jZB/arTK0bly1FuyWSNRYG1N/NFvYyj3gSNJk+MQhNze8R4o67HAZAeTKnkV0M40G9lqXOPgP37kq5mo3wk/L5p2Hj7Np5yT6wo3Hvk8mfv4JAIDUD8qrXJ7zB+Y/AqcO1/wBoVS4P2lPzWWM3cPb3B1SUlgPs2dEkxG2aSrvolaUKJ7VfySspCmV0MKtlgSDQigswMdqFlNx/Cwk8OnvXgV47NUefz9dl7j25qhtrVdMHKBPmNF4WdyTxWZKja2Rv/wCVdwpk1Gz4lU4lX8Ld9p/sKxLhqPQw7P0u408SJ9UWUDA10WFg7IYz/EfBENJhMBcsunow0hlSoToFC9hG60IYwS8gDmVQucRtiDFVkDjnCyjdWVnNBOgTzXykNOnlCp1MYtwYa4iOOQtVunWYWh5qNcD90lwctUykcf8AZG4OJID3AHcBxaCtOxdADVXpsZU7zCJ/uAMytFloYBCTMOLTO16YI20hecdqXD+YA4NknyH6e9emVR3DO4C8h7R1ialV071C0fA+6PVax7ZHO6iD7N/NHPZh+Wk2N3GI8iEEMCOeyzA4UG/nM9AV1M4EH1FmVgbyEKk/eofyR8T81eB0HryVF33a3n/8rIzjNyq1f+pT8/grTdyq1x/Up9XfBZYBJbNhjB+UJKWm2AEkxG3mUTt1K5QvGq6iI4lNc7QzsN11QPcduQl309YSABP4nXGW1Ddi+qJGxGhPyC8hef0XpH8V6+tFg8SfcPqvN3KculI8GjaFNYVIqjkTHqoHGB5LlAwQfCVlmlpnq2FnuwiO2eANfogrsxfitTGveGjxyKJ6b9IXHNU6O+DtWMvmmoYO3gq7sAZU2ADo5K8w6yrdG4Dd4+Czb+FYutg87AXt3EHhpIKqVsHMmaev+MosrY41v9hPTVPtMVo1DlLS3qIW1JlllX1AVTsqlNwfTlhG0aT5IwwPEKlRuSqwNqAbjQP+iv1m047oAPqqdFgbUDgsylZmUlLiofib8rSOOXovEsbuRUqHLsHvP+RLt/SF6h2yxYUqTzPfcMtMeJ0nyXkTtXk+Kthj9ODPL4SMGoHMwjnsS2XOH4WnL66IPsqIfUY07ak8NhPyRj2Xf7OoxxENqAgRoJH7CuzmQdOOg6Kk0/ZvPMv8eMK1Udp5KlTP2Q5ls+pWRj2jVV6/9agObyOfBWyFTqf9zaj/AFHfBIArakk1JAGySoX7qVQu3K6SNHXugH/hVZ0JJ3dJO2gU1d/Dmqd5XDaZM8ABxhIZ49/EW5z3eXgxkc4Mk/NCErX7T3XtLqs788Dy0WSVPrNkVQ7LgMCfJJxkprzpHmgC/g+Ivt6oc3Vp+838QXp2F3rKrA9hkHyI8F5HEgHkiLAL17DLTB4jcOCjkhey+GdaZ6g1kxyUrraQszCcVa4DNoii3LHAEGQufh2RaMYWCT7SNgiVtJp4Jr7ZqY/S4YNMOjXVMurtlKm973BrWtlxOgCdj+KW9owvqvDNO637z39AvIe0XaSpeHK0FlEO7rJku8XfRajByf8ARLJlUf8ATmNYw67r59cgn2TTplaNJ6k/AKiwaxMwN9plNoaEmAQAAAdipbdu5XUkkqRxNuTtmlg1IOe8xJFOG9TAHxKM7W0z23dHfZULmcP3ognCLsskNAJzzr4DRF2DYx7NsFubvSf7Bsst0CTfAjoXgqU8/wCSTw6++U9jYp0x4MHwQ3/Phj6gaIY+S0TOQrdZiNJzWgOgy3cRsRxWfSNeWXKh1VECbyzH/lPo1W3vBgggjwOZVrUTfUfy29U+9o+aZkKWpLrUkwNUFQveM0Kve4lSoNL6lRtNo4l2X05oKxHttmLhbUy/f7R49nTHQbn3Kzkl0kot8DK5ug2XEhrRqXE5EB9qO11PIadA5+6cz/7do059UPX97cXRmo8vHi7JTHRo381iYr3GhvEnfeVJzt0iihStmU9xc4k6668VFUPBPOgUT9vgtCGu/fFNcut1ScEAKjxHNaOGvLXieB9yzqQ7wV9mhB9VmW9Dj/IdYfp+5W5bVHDYkecLDwol1NjubQtui1csjuhwvjFarRoQeoWTi3aG4a0w8N04N196nqbIV7QXEAoirYSdKwLxW4fVqPe97nuLt3OLyqlP3BWrlgieabYNBkOEgu15jxXUtI4XbZIzRjeZkqzo1sevpqoXkAgcB8FMxuYgeGvVOxpWSWtUN8CdSYla9lcNMwQehVGjajQRPkrLbNsyJB4cVKTTLRi0XS+dOI1CuWlxOnhI6LCoioHEtdOp0dqr9u18gkAQTsc25U2jaezbp1iNQSOhhXbLETTqiq4ZyKZZvk0JB+QWOxynaCsqTRpxT6G9pjdF8AuyHk7u+/ZJBbG6jqkt+2T/ADRVewl5fUL61QzL3mQPoE4W5dGczxgaNC0/ZMEkwTPVUrmsGyTOWORWfbkUUVFEL278GjbhKEMRuvaVHEfdaYbxWxjV/DDl46bx5IbaIA5lVxx+s58kviE88TwVeq7ZPrHdRPO3RVRJjmhdA3C433hPATA4xpn3q688CDq08OPBVmDVx/Kta2pA1Gg7ZmAzoN1mTNxVhT2eqD2NMH8KIKbwBvosai2i37OkDkaXAuIye0OYmY4CCB5LYyUm02EOPtHNGYA6Aa+i5pK2zri6SK9zciDl70DWO9CEcXY5xBPFktHKUaYzXt3spihTyQ0+0BEmZ58evihi4ol7i46ojSYSTkgTdbOJGmgTWUSwuEfedpp6on/lPDVRvtByVFMk8YNGkS8AggSJ0laNG1LXRMg/cMRmHNan8mCYHDfRPZayQBoJ7nDX6FDnY4462dtLXxlXTawJG6mtWSNoI3G0FX/Yy2PBSctllHQMWdOZ/wAz8Veywm29PK6oOTz9VNCGxJUcpqwyVxlNWWUkgO0m6jqkrVGlt1SQOiK4rBszAM6f3krEuQXkkzlHkFq1aUyXGBvG2iwsavvZ0zlOrtG8PRairdGJulbBzFrjPUyt+60wOMniVXeoG7g/mCme7QldSVKjju3ZDOsJrh6hMB1lTNM68UxEbTCnaPRMcyfBSUmEg6JMCRjfvf4okweyL++RuZ56IeY37onfQr0iytw1oAGgEKWSVI6MMbZFa28Eq77IqaiwQFKWcFzWdSRmvp81CbeVpuppnskDozDb/oq90wN8on1W0+mPRZ1anmLuMPEfm8E0xNEFGjs3YnV55KWragCArNCnl1O5MngpnslJyGolakMwzj+o0faj8QH937+Su04I8lmGoaVRlQahr++PxM2cPSVoXlM0KmUa03iaR3A8P3zW2vStGE/LpmXcMio8cwD8vkkGaruJPh9N/AmD5/qpaOsJD+k9Clor1Kh4JWrJWxbW0wsNgkUaVvsktxlqOSSLHQD4hIBkECdgILuSAcYrPqVDoSBoNFxJdGHpyZm6KAY6RofRPqMdtB127qSS6DnK5pu/CfRPax3I+iSSAJGNJ4EH/FaFvSJaGkHfkUkkmaiKnbEOMtJZmIdA28/RH2C1jUpgH7zRlfpuRx8xB80klHJw6MXTYYwwNOCeWk8FxJc50oRZ4e5NLDyKSSRohew8j6Kqy31Oh116LqSBHXUjI0PopAw8j6JJJMZVuKB10PotSzofzFmGH77DlafwkfdPoQEklXD9JZfgOX9u51NwIIe07RsQlYPJAJB25JJJ/A+m7Zu20PoiSzboEklORtGnTYkkkkYbdn//2Q=="
              />
            </div>
            <button
              type="button"
              onClick={handleSearchMember}
              className="invite-member-btn"
            >
              <AiOutlinePlus className="icon" />
              Invite a Member
            </button>
          </div>
        </Header>
        <Board />
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          modalTitle="Search a member"
        >
          <SearchContainer className="search-container">
            <div className="members-selected">
              {membersSelectedToInvite.map(({ name, email }: any) => (
                <div className="member-selected">
                  {name}
                  <GrFormClose
                    className="icon"
                    onClick={() => handleRemoveMemberFromSelectedList(email)}
                  />
                </div>
              ))}
              <button
                type="button"
                className="invite-btn"
                onClick={handleInviteMembers}
              >
                Invite
              </button>
            </div>
            <input
              type="text"
              placeholder="Type the member email"
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
            />
            <div className="members-found">
              {membersFound.map((user: any) => (
                <div className="member">
                  <div className="infos">
                    <img src={user.image} alt="member" />
                    <div className="name-email">
                      <p className="name">{user.name}</p>
                      <p className="email">{user.email}</p>
                    </div>
                  </div>
                  <AiOutlinePlus
                    className="icon"
                    onClick={() => handleAddMemberToSelectedList(user)}
                  />
                </div>
              ))}
            </div>
          </SearchContainer>
        </Modal>
      </Container>
    </BoardContextProvider>
  );
};
