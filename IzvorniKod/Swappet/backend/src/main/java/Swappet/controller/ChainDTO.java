package Swappet.controller;

import java.util.List;

public class ChainDTO {

    private List<String> mails;
    private List<Integer> ids;
    private List<String> opisiOglasa;
    private List<String> opisiZamjena;

    public ChainDTO(List<String> mails, List<Integer> ids, List<String> opisiOglasa, List<String> opisiZamjena) {
        this.mails = mails;
        this.ids = ids;
        this.opisiOglasa = opisiOglasa;
        this.opisiZamjena = opisiZamjena;
    }

    public ChainDTO() {
    }

    public List<String> getMails() {
        return mails;
    }

    public void setMails(List<String> mails) {
        this.mails = mails;
    }

    public List<Integer> getIds() {
        return ids;
    }

    public void setIds(List<Integer> ids) {
        this.ids = ids;
    }

    public List<String> getOpisiOglasa() {
        return opisiOglasa;
    }

    public void setOpisiOglasa(List<String> opisiOglasa) {
        this.opisiOglasa = opisiOglasa;
    }

    public List<String> getOpisiZamjena() {
        return opisiZamjena;
    }

    public void setOpisiZamjena(List<String> opisiZamjena) {
        this.opisiZamjena = opisiZamjena;
    }
}
