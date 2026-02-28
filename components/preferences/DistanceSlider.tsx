import { hapticSelection } from "@/lib/haptics";
import { useAppTheme } from "@/lib/theme";
import Slider from "@react-native-community/slider";
import { StyleSheet, Text, View } from "react-native";


export const DISTANCE_STEPS: (number | undefined)[] = [10, 25, 50, 100, undefined];

export const getDistanceLabel = (distance: number | undefined): string => {
    if (distance === undefined) return "unlimited";
    return `${distance} miles`;
}

/** Get the index for a given distance value in DISTANCE_STEPS */
export const getDistanceIndex = (distance: number | undefined): number => {
    if (distance === undefined) return DISTANCE_STEPS.length - 1;
    const index = DISTANCE_STEPS.indexOf(distance);
    //if exact match not found return last index
    if (index === -1) {
        for (let i = 0; i < DISTANCE_STEPS.length - 1; i++) {
            const step = DISTANCE_STEPS[i];
            if (step !== undefined && distance <= step) {
                return i;
            }
        }
        return DISTANCE_STEPS.length - 2;
    }
    return index;
}
interface DistanceSliderProps {
    /** current distance index (0-4) */
    value: number;
    /** Callback when the distance changes */
    onChange: (index: number) => void;
}


/**
 * A slider component for selecting maximum distance preference.
 * Uses predefined steps: 10, 25, 50, 100, Unlimited.
 */
export function DistanceSlider({ value, onChange }: DistanceSliderProps) {
    const { colors } = useAppTheme()
    const maxDistance = DISTANCE_STEPS[value];
    const handleValueChange = (newValue: number) => {
        const rounded = Math.round(newValue);
        if (rounded !== value) {
            hapticSelection()
            onChange(rounded)
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.label, { color: colors.onSurfaceVariant }]}>
                    Maximun distance
                </Text>
                <Text style={[styles.value, { color: colors.primary }]}>
                    {getDistanceLabel(maxDistance)}
                </Text>

            </View>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={DISTANCE_STEPS.length - 1}
                step={1}
                value={value}
                onValueChange={handleValueChange}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={colors.surfaceVariant}
                thumbTintColor={colors.primary}
            />
            <View style={styles.labels}>
                <Text style={[styles.endLabel, { color: colors.onSurfaceVariant }]}>
                    10 mi
                </Text>
                <Text style={[styles.endLabel, { color: colors.onSurfaceVariant }]}>
                    Unlimited
                </Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {},
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
    },
    value: {
        fontSize: 20,
        fontWeight: "700",
    },
    slider: {
        width: "100%",
        height: 40,
    },
    labels: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: -8,
    },
    endLabel: {
        fontSize: 12,
        fontWeight: "500",
    },
});