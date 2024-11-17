package haengdong.event.domain.step;

import java.util.ArrayList;
import java.util.List;
import haengdong.event.domain.bill.Bill;

public class Steps {

    private final List<Step> steps;

    private Steps(List<Step> steps) {
        this.steps = steps;
    }

    public static Steps of(List<Bill> bills) {
        List<Step> steps = new ArrayList<>();
        Step currentStep = null;

        for (Bill bill : bills) {
            if (currentStep == null || currentStep.isNotSameMember(bill)) {
                currentStep = Step.of(bill);
                steps.add(currentStep);
                continue;
            }
            currentStep.add(bill);
        }
        return new Steps(steps);
    }

    public List<Step> getSteps() {
        return steps;
    }
}
