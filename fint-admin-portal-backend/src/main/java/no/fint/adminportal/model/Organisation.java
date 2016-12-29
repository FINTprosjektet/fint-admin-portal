package no.fint.adminportal.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.ldap.odm.annotations.Attribute;
import org.springframework.ldap.odm.annotations.Entry;
import org.springframework.ldap.odm.annotations.Id;
import org.springframework.ldap.support.LdapNameBuilder;

import javax.naming.Name;


@ApiModel
@Data
@Entry(objectClasses = {"organizationalUnit", "top", "fintOrg"})
public final class Organisation implements LdapEntry {

  @Id
  private Name dn;

  @ApiModelProperty(
    value = "Unique identifier for the organisation (UUID). This is automatically generated and should not be set."
  )
  //@DnAttribute(value = "ou", index = 2)
  @Attribute(name = "ou")
  private String uuid;

  @ApiModelProperty(value = "The organisation number from Enhetsregisteret (https://w2.brreg.no/enhet/sok/index.jsp)")
  @Attribute(name = "fintOrgNumber")
  private String orgNumber;

  @ApiModelProperty(
    value = "Id of the organisation. Should be the official domain of the organisation. For example rogfk.no"
  )
  @Attribute(name = "fintOrgId")
  private String orgId;

  @ApiModelProperty(
    value = "The official name of the organisation. See Enhetsregisteret (https://w2.brreg.no/enhet/sok/index.jsp)"
  )
  @Attribute(name = "fintOrgDisplayName")
  private String displayName;

  @Override
  public void setUuid(String uuid) {
    this.uuid = uuid;
  }

  @Override
  public String getDn() {
    if (dn != null) {
      return dn.toString();
    } else {
      return null;
    }
  }

  @Override
  public void setDn(Name dn) {
    this.dn = dn;
  }

  @Override
  public void setDn(String dn) {
    this.dn = LdapNameBuilder.newInstance(dn).build();
  }


/*
  public void setDn(Name dn) {
    this.dn = dn;
  }

  public void setDn(String dn) {
    this.dn = LdapNameBuilder.newInstance(dn).build();
  }
  */
}