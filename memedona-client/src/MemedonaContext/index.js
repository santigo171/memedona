import React from "react";

import { changeFavicon } from "./changeFavicon";

const MemedonaContext = React.createContext();

function MemedonaProvider(props) {
  const memes = [];

  const logoUrl =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHgAcAMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAAAwQFBgECBwj/xAA6EAACAQMCBAMFBwIFBQAAAAABAgMABBEFIQYSEzEiQVEUFWFx0QcjMlWBkZNSoSRCc7HhJTM0krL/xAAZAQADAQEBAAAAAAAAAAAAAAAAAwQCAQX/xAAiEQACAgICAgMBAQAAAAAAAAAAAQIRAwQhQRMxEiJhURT/2gAMAwEAAhEDEQA/ALLw1xprWo2N5JepHHLHp8k0RVBhnSNcsR6Fy2PhSujfaBfNEov7BJJp7iSONBJydPliVgG2OxPPv8sA74d6ZxFw6eHpNQbSo0a3toY7mGCJTgSqMou48PcYONhnzGcS8Q8IJOryaUonUz8n+HTmzGg58b+YwP8AfAoAeaJxjJrV3p8cNiIjc25mKGfPKOYdzy9+XJA2ydvLIxr3Et9oWq6i80Uc+n2trFMqBuV2LkggHB/CIpD8eYZwBmmFtrGiLpntsWg26X9lb2bvEsSeFJXGAh+BzjONwPnTnVeJuHryKb2nTTcF0fDT26srCMEgnfOMuQPPc/OgDfUOMbiz4jvNP9jLwRmGKMq3i5m5yznbYDCjHwO/lTe+45uE4W1W8tLVfa7SBOkzyZVmdCeY+HGxU5Az2xkb43sr/Q9ZuLs3Wi9C/frySTrEjuehJJErA7nnwjEDBx8fPezuuF59Lu7UaMGt1to5p4pYI26wCqUzuQx8Q37fGgB2eMmFg92umthbuWDlaXlyiRNLzjw+YXGPXzI3LBuM9RmcJZ6fEJWki5hcTECIF4EIGEyc9U7nGMfpWbjiPRorK69i0CeSVBLc+ztbpFzNyHnZgx8J/EhyM9xjFS+gjQNWju0sNPgRbaQ2kqmJAMry5XbO3hX/ANR8KAIufjeSTRLHUbexMYurpVw75KxZVs9tyVI+AJ7kDJ3ueMrqC3029OnoILmGRpYmlIdWE0US4JXt94TuAflVjOh6UYoojp1qY4pTNGnSXCOe7D0O9ZbRNLa1itW061NvECscRiHKoO5AHxoArOo8azadfsrWJnjksoriJEfcMzKGU+E5/GDn4eXestx46XUccmlhYpJQnU9qGQDO0IJHLjupJ32HnVluNF0y5/8AI0+1l8Aj8cQPhBBA+XhH7Ch9F0tyC+n2rYORmIf1F/8A6JPzNAFTX7Rea2lmOlY6cTOV9oPiKycjKByZ+I2yfMDuL2rBlBHY1FjhzRRD0RpVl0sY5OguMZz2x670/tLaKztkt4F5Y0GFHpQBBXHBulPoV3pNus0MM8aoCJ5D0ygwhHi2wdyPPfPesjgrRORx0J/vOr1MXUoDdUAPtzbDYEDsCMjBqu8N8a6pqhnF1HFGUti6YjwGYI7Z79th/epCw44N17NCNMmaaRVDtzgIH5+QjOP1H6/qAScXBmixWt1bRw3AjukiSX/FykkR4KYPNlTkZyMEnvQeC9CIYeyPhucEdeTADAA432Gw2+frURF9ocT2cdy+mSpz78nWUnGDv+4x6DPfcAyWi8Ve97+K0isWRnhaViZgeQK/Iw288kfMH5ZAHtvwxpVrdyXUEEiSyLKjEXEmMSOXfA5sAlmY5G4ycYpODhPSLeO5SKGZfaYejKxuZCSvqMts3nzDep0dqKAIKHhHRoUlRLeXlliMTc1xITyleUgEtkbeY8yT3NP9M0u20tZltBIBNKZX55WfxHvjmJx64HmTT6jNABRRRQAUUUUAFFFFAEGtpw9ZSFQmnwOqdIqWVSFwRy4z2wSKTituGIplmi92JIgwrh0yPFzevrvXl1gHkZ5BzuxJZm3JPqTR00/oX9qT5RPm/D08dO4SKIhi0nlQYQFk8I+G9KwQcM21yLm392RzrsJFkQHvnvn1ry0Y0JzyLj5UgzIWKxxq3x5dq6sjfpHVlvo9e+9tO/MLT+dfrQdX078wtP51+teOZgufwrn5CmrDfsP2pyi65NqVntD3tpv5hafzr9aPe2m/mFp/Ov1rxdgelHLt2oo7Z7R97ab+YWn86/Wj3tpv5hafzr9a8XBduwowPSigs9o+99O/MLT+dfrWfe2nfmFp/Ov1rxjGwQ5UDPyqRt5opMKyKrfIb1iTa6MuTR6997ab+YWn86/WtotRsppAkV3byOeypKpJ/Y15JESHui/tS8I6LpJF93IhDI6bFSOxBpXm/Bfm/BBtsGgnz8q27001CbpL017nvSor5OhajYnPcdR+kjYXzPrT6G2+58Az+lQaths1JWd8YiM/rmrYRUUO+NLgTuLd1ZiVwAe9S2icH3ms2ouFkSGJmIDMM5/St4b23nAWRRvneum6Rapb6dDDHsqoP3pOzkcEqH62L5ydlHH2azeeox4/0/8Amtj9nBVfFqIz54j/AOa6LygACtJEqF7GX+nof5sS6Oa3nAYtrSaaO8MjxqWA5cA4qmCPPfvXcpoOdWXGzDHeuf3uk2lnKWkJzzHaqtXLKdqRHtY4wpxKaYyv+U1sqn0NWZvYid496SZLYkAL5VZRI2MrV25AJO/rTnuKTuEi5SFyPStbaUyRtzfiXY1Lmx1yhUo8my48/LvUHcy9Wd28s7VL3T9O3dvPGBUEDvXcMexmJcWbCs53rFA2NUDBxAxDgb11McRzW4jU2MgQgAMf0rldvkyx/FhXQ5LTUZnjaS88AA8HJ2+FRbnRTrXbot1tfG7iDxjz9O1Q2ra/dwSGO3hQ4Pc1JcOQm3inDHIxkVG3Fh1bh3Klmz2PavPjZ6EjFlqN/KBJ17Zs94we1VXie4Y30qtsebOPSrOvDcTOzpEUZj3DHw/KqdxdG1nrEkLMXKouSflV2q/sQ7K+pGdX40dYetNS3nWvMa9EgodmQNtmsRyckvMDsRg0yZ8HvWOc42O9ZkrVHXGx5qsmECefnUTT7UT94fnTHO9LxqkdgqRuKMb0A0b0w0OtOXmvrZfWVB/cV29wCAFUcuK4hpu99b/6q/713C2/7Yz515+7zRdpr2bach5JD5HakCOWUjINNzeXNnNJEIuZCcqQaSsZLiaZuuAAu6kVLFFbJdSVU7dq5l9oQ/631B2eJf7V0sNzRnyrnf2jRct1aSf1RsP2I+tO1uMiJ9lL4FPzWpfBrGa0f1NeqzzEjJOawa1J2wO9bLHI3ZG/as2uzo4mAeQ83akhCmRk4HnV2k4KgXdr+Q/JBTW64TijH3V4zH0ZQKWkzCZCRaRFIgdLgsp8wO1K+41x4ZST8q0nspLUlCXX9aX064MBMcjEoxzv5ViamuUx8XF8NCthoXLdxN1fwsDnFdDe86AG/hx3zVViYKwYVMWt6rFQ65xXn5ZSk+S/CklwLtqlhJIVkuX5/URkgfrSiapZKwVLhwcbExnBrDqEHUjQfIis27tIcOgHpisqQ9oe2911WGGypPeoriXSotV6RZmDR5xj40+uGcsoUYxSrlekCxGcVxSadoy4pqmVKPha1XduY+ucU21DTtN05A04XxfhUjJNWDUL6G1hZ5G7DYetUnUm95XPVYlWIwADnb5VVhU8ntkeZwh6HLXuk20RaKFJZf8AKvLsPnSKSGWPnIGT3wKLXQGmOWk5F9Tip634egjhCNcSk99sU+WKSIck3IvracsqZTbemNzph5CCvbcHFZoqoyQcmnQXl5HaTOIjJkLkdzUVe8JToxMMibHGGzRRR0dtkcLPUbIlZI+pGPJTuKXh1SKM4djGw784xRRUuTFFsfjyyRYrHVY3QDmBHrTyS7hxmMjmooqV40pUWLI6Ie/1y3tmxLL4/MDemkWuvfnp2MTMfNn2AooqxasKJJbExC802a6nUGbmAHiPbJ+FOrfSQhyqjPxooqiKSVIQ5N8smfd6RT9JTzEKOb4E+VSMOnkAnzoorrOM/9k=";
  const logoColor = "#ff00ff";

  const logoProps = {
    url: logoUrl,
    color: logoColor,
  };

  changeFavicon(logoUrl);

  return (
    <MemedonaContext.Provider value={{ memes, logoProps }}>
      {props.children}
    </MemedonaContext.Provider>
  );
}

export { MemedonaContext, MemedonaProvider };
