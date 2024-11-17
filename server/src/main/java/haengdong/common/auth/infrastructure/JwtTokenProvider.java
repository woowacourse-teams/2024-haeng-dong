package haengdong.common.auth.infrastructure;

import haengdong.common.properties.JwtProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import haengdong.common.auth.TokenProvider;

public class JwtTokenProvider implements TokenProvider {

    private final JwtProperties jwtProperties;

    public JwtTokenProvider(JwtProperties jwtProperties) {
        this.jwtProperties = jwtProperties;
    }

    @Override
    public String createToken(Map<String, Object> payload) {
        Claims claims = Jwts.claims(new HashMap<>(payload));
        Date now = new Date();
        Date validity = new Date(now.getTime() + jwtProperties.expireLength());

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, jwtProperties.secretKey())
                .compact();
    }

    @Override
    public Map<String, Object> getPayload(String token) {
        return Jwts.parser()
                .setSigningKey(jwtProperties.secretKey())
                .parseClaimsJws(token)
                .getBody();
    }

    @Override
    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(jwtProperties.secretKey()).parseClaimsJws(token);

            return !claims.getBody().getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}

