import { hapticSelection } from "@/lib/haptics";
import { useAppTheme } from "@/lib/theme";
import Slider from "@react-native-community/slider";
import { StyleSheet, Text, View } from "react-native";

interface AgeRangeSliderProps {
    min: number;
    max: number;
    onChange: (min: number, max: number) => void;
}

export function AgeRangeSlider({ min, max, onChange }: AgeRangeSliderProps) {
    const { colors } = useAppTheme();

    const handleMinChange = (value: number) => {
        const rounded = Math.round(value);
        if (rounded !== min) {
            hapticSelection();
            // Ensure min doesn't exceed max
            onChange(Math.min(rounded, max - 1), max);
        }
    };

    const handleMaxChange = (value: number) => {
        const rounded = Math.round(value);
        if (rounded !== max) {
            hapticSelection();
            // Ensure max isn't less than min
            onChange(min, Math.max(rounded, min + 1));
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.label, { color: colors.onSurfaceVariant }]}>
                    Age Range
                </Text>
                <Text style={[styles.value, { color: colors.primary }]}>
                    {min} - {max}
                </Text>
            </View>

            <View style={styles.slidersContainer}>
                <View style={styles.sliderRow}>
                    <Text style={[styles.sliderLabel, { color: colors.onSurfaceVariant }]}>Min</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={18}
                        maximumValue={99}
                        step={1}
                        value={min}
                        onValueChange={handleMinChange}
                        minimumTrackTintColor={colors.primary}
                        maximumTrackTintColor={colors.surfaceVariant}
                        thumbTintColor={colors.primary}
                    />
                </View>

                <View style={styles.sliderRow}>
                    <Text style={[styles.sliderLabel, { color: colors.onSurfaceVariant }]}>Max</Text>
                    <Slider
                        style={styles.slider}
                        minimumValue={18}
                        maximumValue={99}
                        step={1}
                        value={max}
                        onValueChange={handleMaxChange}
                        minimumTrackTintColor={colors.primary}
                        maximumTrackTintColor={colors.surfaceVariant}
                        thumbTintColor={colors.primary}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
    },
    value: {
        fontSize: 20,
        fontWeight: "700",
    },
    slidersContainer: {
        gap: 8,
    },
    sliderRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    sliderLabel: {
        width: 30,
        fontSize: 14,
        fontWeight: "600",
    },
    slider: {
        flex: 1,
        height: 40,
    },
});
